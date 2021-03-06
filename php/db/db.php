<?php
header("Access-Control-Allow-Origin: *");

require_once 'db_error.php';
require_once 'db_config.php';

mysqli_report(MYSQLI_REPORT_STRICT);

class DatabaseConnection{
    const PATH = DB_SERVER, USERNAME = DB_USERNAME, PASSWORD = DB_PASSWORD, DATABASE = DB_DATABASE_NAME;
    private $connection;

    public function __construct(){
        $this->connection = new mysqli(self::PATH, self::USERNAME, self::PASSWORD, self::DATABASE);
        if (!$this->connection->set_charset('utf8')) {
            printf("Errore nel carricare UTF8: %s\n", $this->connection->error);
        }
    }

    function __destruct(){
        $this->connection->close();
    }


    /**
     * Funzione che recupera le domande della sorveglianza
     * @return array|db_error
     */
    function get_questions(){
        $query = 'select * from question join type on question.type = type.id';

        $result = $this->connection->query($query);

        if ($result === false )
            return new db_error(db_error::$ERROR_ON_GETTING_QUESTIONS);

        $result_array = array();

        //todo da mettere dove serve htmlspecialchars
        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('number' => $row['number'], 'question' => $row['question'], 'type' => $row['description']);
        }

        return $result_array;
    }

    /**
     * Funzione che salva i dati della sorveglianza
     * @param $domande - i dati da salvare
     * @return array|db_error
     */
    function save_temp_surveillance($domande){
        $this->connection->autocommit(false);
        $errors = array();

        $query = "insert into temp_surveillance (frequency, contratto, filiale, name, email, number, type, answer)
                  values (?, ?, ?, ?, ?, ?, ?, ?)";


        foreach ($domande as $elemName => $elem) {
            if ($elemName !== "info") {
                $question = 1;
                if(is_array($elem)) {
                    foreach ($elem as $item) {
                        $result = $this->parse_and_execute_insert($query, 'ssssssss', $domande['info']['frequenza'],
                            $domande['info']['contratto'], $domande['info']['filiale'], $domande['info']['incaricato'], $domande['info']['email'], $question++, $elemName, $item['checked']);

                        if ($result === false)
                            array_push($errors, 'insert');
                    }
                }
            }
        }

        if(!empty($errors)){
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_SAVE_TEMP_SURV);
        }

        $this->connection->commit();

        return $errors;
    }

    /**
     * Funzione che recupera i dati della sorveglianza salvati in precedenza
     * @return array|db_error
     */
    function get_temp_saved_sorveglianza(){
        $this->connection->autocommit(false);
        $errors = array();

        $query = 'SELECT temp.frequency, temp.contratto, temp.filiale, temp.name, temp.email, temp.number, temp.answer,
                  temp.type, question.question FROM (SELECT temp_surveillance.frequency, temp_surveillance.contratto,
                  temp_surveillance.filiale, temp_surveillance.name, temp_surveillance.email, temp_surveillance.type,
                  temp_surveillance.number, temp_surveillance.answer, type.id FROM temp_surveillance JOIN type ON
                  temp_surveillance.type = type.description) as temp LEFT JOIN question ON temp.id = question.type AND
                  temp.number = question.number';

        $result = $this->connection->query($query);

        if ($result === false)
            array_push($errors, 'select');

        $truncateQuery = "truncate temp_surveillance";

        $truncateResult = $this->connection->query($truncateQuery);

        if ($truncateResult === false)
            array_push($errors, 'truncate');

        if (!empty($errors)) {
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_GETTING_QUESTIONS);
        }else {
            $this->connection->commit();

            $result_array = array();

            //todo da mettere dove serve htmlspecialchars
            while ($row = mysqli_fetch_assoc($result)) {
                $result_array[] = array('frequency' => $row['frequency'], 'contratto' => $row['contratto'], 'filiale' => $row['filiale'],
                    'name' => $row['name'], 'email' => $row['email'], 'number' => $row['number'], 'type' => $row['type'], 'answer' => $row['answer'], 'question' => $row['question']);
            }
            return $result_array;
        }
    }

    /**
     * Funzione che inserisce un motivo
     * @param $motiv - il motivo da insrire
     * @return bool|db_error|mixed
     */
    function insertMotiv($motiv){
        $query = "INSERT INTO motivs (descrizione) VALUES (?)";
        $result = $this->parse_and_execute_insert($query, 's', $motiv);

        if ($result instanceof db_error){
            return $result;
        }

        if ($result === false){
            return new db_error(db_error::$ERROR_ON_INSERTING_MOTIV);
        }

        return $this->connection->insert_id;
    }

    /**
     * Funzione che recupera i motivi
     * @return array|db_error
     */
    function getMotivs(){
        $query = 'SELECT * FROM motivs ORDER BY descrizione ASC ';

        $result = $this->connection->query($query);

        if ($result === false){
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)){
            $result_array[] = array('descrizione' => $row['descrizione']);
        }

        $result->close();

        return $result_array;
    }

    /**
     * Funzione che cancella un motivo
     * @param $motiv - il motivo da cancellare
     * @return bool|db_error|mysqli_stmt
     */
    function deleteMotiv($motiv){
        $query = 'DELETE FROM motivs WHERE descrizione = ?';

        $statement = $this->parse_and_execute_select($query, "s", $motiv);

        if ($statement instanceof db_error)
            return $statement;

        return $statement->affected_rows == 1 ? true : new db_error(db_error::$ERROR_ON_DELETE_MOTIV);
    }

    /**
     * Funzione che aggiorna un motivo
     * @param $oldMotiv - il vecchio valore
     * @param $newMotiv - il nuovo valore
     * @return db_error|int|mysqli_stmt
     */
    function updateMotiv($oldMotiv, $newMotiv){
        $query = "UPDATE motivs SET descrizione=? WHERE descrizione=? ";
        $statement = $this->parse_and_execute_select($query, "ss", $newMotiv, $oldMotiv);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_UPDATE_MOTIV);
        }

        return $this->connection->affected_rows;
    }

    /**
     * Funzione che inserisce il cambio anagrafica
     * @param $db_json - i dati da inserire
     * @return bool|db_error|mixed
     */
    function insertAnagrafica($db_json){
        $query = "INSERT INTO cambio_anagrafica (json_string) VALUES (?)";
        $result = $this->parse_and_execute_insert($query, 's', $db_json);

        if ($result instanceof db_error){
            return $result;
        }

        if ($result === false){
            return new db_error(db_error::$ERROR_ON_INSERTING_MOTIV);
        }

        return $this->connection->insert_id;
    }

    /**
     * Funzione che inserisce la richiesta di assistenza
     * @param $assistenza - i dati da inserire
     * @return bool|db_error|mixed
     */
    function insertAssistenza($assistenza){
        $query = "INSERT INTO assistenza (json_string) VALUES (?)";
        $result = $this->parse_and_execute_insert($query, 's', $assistenza);

        if ($result instanceof db_error){
            return $result;
        }

        if ($result === false){
            return new db_error(db_error::$ERROR_ON_INSERTING_MOTIV);
        }

        return $this->connection->insert_id;
    }

    function insertRegistration($piva, $nome, $email, $password, $confirmed)
    {
        $this->connection->autocommit(false);

        $errors = array();

        $query = "SELECT email FROM autorizations WHERE email = ?";

        $result = $this->parse_and_execute_select($query, 's', $email);

        if ($result === false || $result instanceof db_error){
            array_push($errors, 'db_error_authorizations');
        }

        $result->bind_result($res_email);
        $fetch = $result->fetch();

        $result->close();

        if (!$fetch) {

            $query = "INSERT INTO autorizations (email, password, authorized) VALUES (?, ?, ?)";
            $result = $this->parse_and_execute_insert($query, 'ssi', $email, $password, $confirmed);

            if ($result === false || $result instanceof db_error) {
                array_push($errors, 'db_error_authorizations');
            }

            $auth_id = $this->connection->insert_id;

            $query = "INSERT INTO contracts (auth_id, piva, name) VALUES (?, ?, ?)";
            $result = $this->parse_and_execute_insert($query, 'iss', $auth_id, $piva, $nome);

            if ($result === false || $result instanceof db_error) {
                array_push($errors, 'db_error_contracts');
            }
        }

        if (!empty($errors)) {
            $this->connection->rollback();
        }

        $this->connection->commit();

        return $errors;
    }

    function insertSecondRegistration($email, $piva, $nome){
        $this->connection->autocommit(false);

        $errors = array();

        $query = "SELECT id FROM autorizations WHERE email = ?";
        $result = $this->parse_and_execute_select($query, 's', $email);

        if ($result === false || $result instanceof db_error){
            array_push($errors, 'db_error_authorizations');
        }

        $result->bind_result($res_id);
        $fetch = $result->fetch();

        $result->close();

        if ($fetch){
            $query = "INSERT INTO contracts (auth_id, piva, name) VALUES (?, ?, ?)";
            $result = $this->parse_and_execute_insert($query, 'iss', $res_id, $piva, $nome);

            if ($result === false || $result instanceof db_error){
                array_push($errors, 'db_error_contracts');
            }
        }

        if (!empty($errors)) {
            $this->connection->rollback();
        }

        $this->connection->commit();

        return empty($errors);
    }

    function control_autentication($email)
    {

        $query = "SELECT password, authorized FROM autorizations WHERE email = ?";
        $statement = $this->parse_and_execute_select($query, 's', $email);

        if ($statement === false)
        {
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $result = $statement->get_result();
        $result_array = array();

        while ($row = mysqli_fetch_assoc($result))
        {
            $result_array[] = array('password'=> $row['password'], 'authorized' => $row['authorized']);
        }

        $result->close();

        $response['new_user'] = false;
        $response['auth'] = false;

        if (!empty($result_array)) 
        {

            foreach ($result_array as $val) 
            {
                if ($val['authorized'] === 1)
                {
                    $response['new_user'] = false;
                    $response['auth'] = true;
                }
            }
        } 
        else
        {
            $response['new_user'] = true;
            $response['auth'] = false;
        }

        return $response;
    }

    function control_contract($email, $contract){

        $query = "SELECT name FROM autorizations JOIN contracts ON id = auth_id WHERE email = ? AND piva = ?";
        $statement = $this->parse_and_execute_select($query, 'ss', $email, $contract);

        if ($statement === false){
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $result = $statement->get_result();
        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)){
            $result_array[] = array('name'=> $row['name']);
        }

        return empty($result_array);
    }

    function get_contracts($email){
        $query = "SELECT piva, name, email FROM autorizations JOIN contracts ON id = auth_id WHERE email = ?";
        $statement = $this->parse_and_execute_select($query, 's', $email);

        if ($statement === false){
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $result = $statement->get_result();
        $result_array = array();

        while ($row = mysqli_fetch_assoc($result)){
            $result_array[] = array('piva'=> $row['piva'], 'nome' => $row['name'], 'email' => $row['email']);
        }

        return $result_array;
    }

    function get_email($username){
        $query = "SELECT email FROM autorizations JOIN contracts ON id = auth_id WHERE piva = ?";
        $statement = $this->parse_and_execute_select($query, 's', $username);

        if ($statement === false){
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $statement->bind_result($res_email);
        $fetch = $statement->fetch();

        if ($fetch) {
            return $res_email;
        }

        return null;
    }

    function get_password($email)
    {
        $query = "SELECT password, piva FROM autorizations JOIN contracts ON id = auth_id WHERE email = ?";
        $statement = $this->parse_and_execute_select($query, 's', $email);

        if ($statement === false)
        {
            return new db_error(db_error::$ERROR_ON_SELECTING_MOTIV);
        }

        $statement->bind_result($res_pass, $res_piva);
        $fetch = $statement->fetch();

        if ($fetch)
        {
            $result['pass'] = $res_pass;
            $result['piva'] = $res_piva;
            return $result;
        }

        return null;
    }

    function change_password($username, $password)
    {
        $query = "UPDATE autorizations INNER JOIN contracts ON id = auth_id SET password = ? WHERE piva = ?";
        $statement = $this->parse_and_execute_select($query, "ss", $password, $username);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_UPDATE_MOTIV);
        }

        return $this->connection->affected_rows;
    }
    
    function change_password_email($email, $password)
    {
        $query = "UPDATE autorizations INNER JOIN contracts ON id = auth_id SET password = ? WHERE email = ?";
        $statement = $this->parse_and_execute_select($query, "ss", $password, $email);

        if ($statement instanceof db_error)
            return $statement;

        if($statement === false){
            return new db_error(db_error::$ERROR_ON_UPDATE_MOTIV);
        }

        return $this->connection->affected_rows;
    }
    /**
     * Metodo che seleziona l'errore da ritornare in funzione dell'array passato come parametro
     * @param string $errors - array contenente gli ultimi errori generati
     * @return db_error - l'errore associato alla coloonna che lo ha generato
     */
    function parse_error($errors){
        if ($errors['errno'] === 1062) {
            $column = $this->parse_string($errors['error']);
//            if ($column === "'email'")
//                return new db_error(db_error::$EMAIL_ALREADY_REGISTERED);
        } //else if ($errors['errno'] === 1452)
        //return new DbError(DbError::$FOREIGN_KEY_ERROR);


        return new db_error(db_error::$ERROR_ON_EXECUTE);
    }

    /**
     * Metodo che seleziona il nome della colonna che ha generato l'errore
     * @param $error_string - la stringa contenente il nome della colonna
     * @return string - il nome della colonna che ha generato l'errore
     */
    function parse_string($error_string){
        $split_error = explode(' ', $error_string);
        return end($split_error);
    }

    /**
     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le insert
     * @param string $query - la query da eseguire
     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
     * @param array ...$params - array con i parametri da passare al bind
     * @return bool|db_error ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
     *                      - il risultato della execute altrimenti
     */
    function parse_and_execute_insert($query, $bind_string, ...$params){

        $statement = $this->connection->prepare($query);

        $bind_names[] = $bind_string;

        for ($i = 0; $i < count($params); $i++) {
            $bind_name = 'bind' . $i;
            $$bind_name = $params[$i];
            $bind_names[] = &$$bind_name;
        }

        call_user_func_array(array($statement, 'bind_param'), $bind_names);

        try {
            $result = $statement->execute();

            if ($result === false) {
                return $this->parse_error($statement->error_list[0]);
            }
        } catch (Exception $e) {
            return new db_error(db_error::$ERROR_ON_EXECUTE);
        }

        $statement->close();
        return $result;
    }


    /**
     * Metodo che prepara la query, fa il bind dei parametri e la esegue, viene chiamata principalmente per le select, update e delete
     * @param string $query - la query da eseguire
     * @param string $bind_string - la stringa con il tipo degli argomenti da passare al metodo bind
     * @param array ...$params - array con i parametri da passare al bind
     * @return db_error|mysqli_stmt ERROR_ON_EXECUTE - se viene generato un errore in fase di esecuzione della query
     *                             - lo statement ritornato dal metodo prepare()
     */
    function parse_and_execute_select($query, $bind_string, ...$params){

        $statement = $this->connection->prepare($query);

        $bind_names[] = $bind_string;

        for ($i = 0; $i < count($params); $i++) {
            $bind_name = 'bind' . $i;
            $$bind_name = $params[$i];
            $bind_names[] = &$$bind_name;
        }


        call_user_func_array(array($statement, 'bind_param'), $bind_names);

        try {
            $statement->execute();
        } catch (Exception $e) {
            return new db_error(db_error::$ERROR_ON_EXECUTE);
        }

        return $statement;
    }
}

//$conn = new DatabaseConnection();
//var_dump($conn->get_questions());
