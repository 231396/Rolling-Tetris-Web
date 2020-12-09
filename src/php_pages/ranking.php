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
                require "../php/database.php";

                session_start();

                try{                                
                    $conn = $database->new_PDO();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
                    $query = $conn->query("SELECT * FROM players_ranks");
                    
                    $i = 0;
                    while($row = $query->fetch(PDO::FETCH_ASSOC)) {
                        td_row($row);
                        if($i++ >= 10)
                            break;
                    }                       

                    $id = 2; // TODO GET FROM LOGIN
                    $query = $conn->query("SELECT * FROM players_ranks pk WHERE pk.id = $id");
                    $currentRow = $query->fetch(PDO::FETCH_ASSOC);
                    
                    echo '<tfoot>';
                        td_row($currentRow);
                    echo '</tfoot>';

                    $conn = null;
                }
                catch(PDOException $e){
                    echo "Connection failed: " . $e->getMessage();
                }

                function add_tag($tag, $str){
                    return "<$tag>" . $str . "</$tag>";
                }

                function td_row($row)
                {
                    echo '<tr>';
                    echo add_tag('td', $row["position"] . 'º');
                    echo add_tag('td', $row["username"]);
                    echo add_tag('td', $row["score"] );
                    echo add_tag('td', $row["level"]);
                    echo add_tag('td', $row["duration"]);
                    echo '</tr>';
                }

            ?>

        </table>
    </div>

</body>

</html>