<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:02 PM
 */

require_once 'db_error.php';
mysqli_report(MYSQLI_REPORT_STRICT);

class Connection{
    const PATH = 'localhost', USERNAME = 'root', PASSWORD = 'password', DATABASE = 'asso';
//    const PATH = 'localhost', USERNAME = 'danielfotografo', PASSWORD = 'gacdicibpi67', DATABASE = 'my_danielfotografo';
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

    //TODO funzioni per interagire con il db

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

    function save_temp_surveillance($domande){
        $this->connection->autocommit(false);
        $errors = array();

        $query = "insert into temp_surveillance (frequency, contratto, filiale, number, type, answer) 
                  values (?, ?, ?, ?, ?, ?)";

        while ($type = current($domande)){
            if (key($domande) !== "info") {
                $question = 1;
                if(is_array($type)) {
                    foreach ($type as $item) {
                        var_dump(key($domande));
                        var_dump($item['checked']);
                        $result = $this->parse_and_execute_insert($query, 'ssssss', $domande['info']['frequenza'],
                            $domande['info']['contratto'], $domande['info']['filiale'], $question++, key($domande), $item['checked']);

                        if ($result === false)
                            array_push($errors, 'insert');
                    }
                }
            }
            next($domande);
        }

        if(!empty($errors)){
            $this->connection->rollback();
            return new db_error(db_error::$ERROR_ON_SAVE_TEMP_SURV);
        }

        $this->connection->commit();

        return $errors;
    }

    function get_temp_saved_sorveglianza(){
        $this->connection->autocommit(false);
        $errors = array();

        $query = 'SELECT temp.frequency, temp.contratto, temp.filiale, temp.number, temp.answer, temp.type, question.question 
                  FROM (SELECT temp_surveillance.frequency, temp_surveillance.contratto, temp_surveillance.filiale, 
                  temp_surveillance.type, temp_surveillance.number, temp_surveillance.answer, type.id FROM temp_surveillance 
                  JOIN type ON temp_surveillance.type = type.description) as temp LEFT JOIN question ON temp.id = question.type 
                  AND temp.number = question.number';

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
                    'number' => $row['number'], 'type' => $row['type'], 'answer' => $row['answer'], 'question' => $row['question']);
            }
            return $result_array;
        }
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

    function test(){
        $query = "SELECT * FROM question";

        $result = $this->connection->query($query);

        if ($result === false )
            var_dump('result false');

        $result_array = array();

        //todo da mettere dove serve htmlspecialchars
        while ($row = mysqli_fetch_assoc($result)) {
            $result_array[] = array('question' => $row['question']);
        }

        return $result_array;
    }
}

//$obj = new Connection();
//var_dump($obj->test());