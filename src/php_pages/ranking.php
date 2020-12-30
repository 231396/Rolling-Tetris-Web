<?php
    require "../php/is_logged_in.php";
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <title>Ranking Global</title>
	<link rel="icon" type="image/ico" href="../../static/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='../css/style-ranking.css'>
    <meta charset="utf-8" />
</head>

<body>
	<header>
        <a class="link-btn" href="game.php">Voltar ao Jogo</a>
    </header>

    <div>
        <table>
            <tr >
                <th>Posição</th>
                <th>Username</th>
                <th>Pontuação</th>
                <th>Nível</th>
                <th>Duração da Partida</th>
            </tr>

            <?php
                require_once "../php/database.php";

                try{                                
                    $conn = $_Database->new_PDO();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
                    $query = $conn->query("SELECT * FROM players_ranks");
                    
                    $i = 0;
                    while($row = $query->fetch(PDO::FETCH_ASSOC)) {
                        echo td_row($row);
                        if($i++ >= 10)
                            break;
                    }                       

                    $id = intval($_SESSION['id']);
                    $query = $conn->query("SELECT * FROM players_ranks pk WHERE pk.id = $id");
                    $currentRow = $query->fetch(PDO::FETCH_ASSOC);                    
                    // print_r($currentRow);
                    if (isset($currentRow['id'])){
                        echo add_tag('tfoot', td_row($currentRow));
                    }

                    $conn = null;
                }
                catch(PDOException $e){
                    echo "Connection failed: " . $e->getMessage();
                }
                catch(Exception $e){
                    echo "Error: " . $e->getMessage();
                }


                function add_tag($tag, $str){
                    return "<$tag>" . $str . "</$tag>";
                }

                function td_row($row)
                {
                    return add_tag('tr',
                        add_tag('td', $row["position"] . 'º') .
                        add_tag('td', $row["username"]) .
                        add_tag('td', $row["score"] ) .
                        add_tag('td', $row["level"]) .
                        add_tag('td', $row["duration"])
                    );
                }

            ?>

        </table>
    </div>

</body>

</html>