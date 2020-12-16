<?php
    // require "../php/is_logged_in.php";
    // if (!$isLogged)
    //     header("Location: login.php");

    session_start();
    $_SESSION['id'] = 1;
    $_SESSION['username'] = "Andre";
    $_SESSION['password'] = "111222";
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <title>Game RT</title>
	<link rel="icon" type="image/ico" href="../../static/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='../css/style-game.css'>
    <meta charset="utf-8" />
</head>

<body>    
    <audio id="music" loop>
        <!-- Music from Tretis 99 -->
        <source src="../../static/Tretris99-GameTheme.mp3" type="audio/mpeg">
    </audio>

    <div id="grid-layout">

        <div id="left-header">
            <h1 class="center-text logo">
                <span style="color: #F30C36">R</span>
                <span style="color: #FE8510">O</span>
                <span style="color: #FFCC1E">L</span>
                <span style="color: #4BC734">L</span>
                <span style="color: #00B9E9">I</span>
                <span style="color: #C01FBA">N</span>
                <span style="color: violet">G</span>
                <br>
                <span style="color: #F30C36">T</span>
                <span style="color: #FE8510">E</span>
                <span style="color: #FFCC1E">T</span>
                <span style="color: #4BC734">R</span>
                <span style="color: #00B9E9">I</span>
                <span style="color: #C01FBA">S</span>
            </h1>
        </div>

        <div id="header">
            <a class="link-btn" target="popup" onclick="window.open('../html/rules.html','popup','width=400,height=400,scrollbars=no'); return false;">Regras do Jogo</a>
            <a class="link-btn" href="ranking.php">Ranking Global</a>
            <a class="link-btn" href="account.php">Configurar Conta</a>
            <a class="link-btn" href="../php/logout.php">Log Out</a>
        </div>

        <div id="center-content">
            <div id="status-box" class="game-box">
                <label>Tempo</label>
                <div id="timer"> 00:00 </div>
                <span class="status-box-space"></span>
                <label>Pontos</label>
                <div id="score"> 000.000 </div>
                <span class="status-box-space"></span>
                <label>Nível</label>
                <div id="level"> 00 </div>
                <span class="status-box-space"></span>
                <label>Linhas</label>
                <div id="lines"> 00 </div>
            </div>
            <div id="menu-box" class="game-box">
                <label>Menu</label>
                <span class="status-box-space"></span>
                <button id="btn-start" class="game-status-btn">Iniciar Jogo</button>
                <span class="status-box-space"></span>
                <button id= "btn-reset" class="game-status-btn">Reiniciar Jogo</button>
                <span class="status-box-space"></span>
                <button id= "btn-pause" class="game-status-btn">Pausar</button>
                <span class="status-box-space"></span>
                <button id="btn-mute" class="game-status-btn">Mutar</button>
                <span class="status-box-space"></span>
                <label>Game Size</label>
                <span class="status-box-space"></span>
                <button id="btn-board-normal" class="game-status-btn">10 x 20</button>
                <span class="status-box-space"></span>
                <button id="btn-board-big" class="game-status-btn">22 x 44</button>
                <span class="status-box-space"></span>
                <div id="btn-board-size">10 x 20</div>
            </div>
            <div id="game-text">Game Screen</div>
            <canvas id="tetris-canvas" width="10" height="20">
            </canvas>
        </div>

        <div id="left-content">
            <h2 class="center-text">INSTRUÇÕES</h2>
            <span class="input-key">A ou &larr;</span> mover para esquerda<br>
            <span class="input-key">W ou &uarr;</span> mover para cima<br>
            <span class="input-key">S ou &darr;</span> mover para baixo<br>
            <span class="input-key">D ou &rarr;</span> mover para direita<br>
            <span class="input-key">Q ou Z</span> rotacionar para esquerda<br>
            <span class="input-key">E ou X</span> rotacionar para esquerda<br>
            <span class="input-key">F ou C</span> hard drop<br>
            <span class="input-key">Enter</span> inicia o jogo<br>
            <span class="input-key">P</span> pausar / resumir jogo<br>
            <span class="input-key">R</span> reiniciar / desistir<br>
            <span class="input-key">M</span> mutar musica<br>
        </div>
        
        <div id="right-content">
            <h2 id="user-name" class="center-text">
                <?php echo $_SESSION['username']; ?>
            </h2>
            <div class="table-wrapper">
                <table id="player-table">
                    <tbody>                        
                        <tr>
                            <th>Pontuação</th>
                            <th>Nível</th>
                            <th>Duração</th>
                        </tr>
                        <?php
                         require "../php/database.php";
                         
                         try{                                
                             $conn = $_Database->new_PDO();
                             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                             
                             $query = $conn->query("SELECT * FROM game_match WHERE idPlayer = " . $_SESSION['id'] . " ORDER BY score DESC");
                             
                             while($row = $query->fetch(PDO::FETCH_ASSOC)) {
                                 echo add_tag('tr',
                                 add_tag('td', $row["score"]) .
                                 add_tag('td', $row["level"]) .
                                 add_tag('td', $row["duration"])
                                );
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
                        ?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <script type="text/javascript">
        var session = <?php echo json_encode($_SESSION); ?>;
    </script>
    <script src="../js/tetrisGame.js"></script>
</body>

</html>