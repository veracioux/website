<!-- TODO: to be continued -->
<!-- Password submission handler. -->
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    #$stagingRootUrl = $_SERVER['HTTP_VERACIOUX_STAGING_ROOT'];
    #if (!$stagingRootUrl)
    #    $stagingRootUrl = "/";
    #exec("htpasswd ", $output, $return);
    exit();

    if ($return === 0) {
        $password = $_POST['password'];
        $time = time();
        exec("htpasswd -Bb /var/www/htpasswd staging-cookie $password");
        setcookie("veracioux_staging_auth", $cookie, 0, "/", "", true, true, [
                "samesite" => "Strict"
        ]);
        #exec("htpasswd ", $output, $return);
    } elseif ($return === 1) {
        http_response_code(501);
        echo "htpasswd file can't be accessed. Either this is served from a " .
             "development machine or you forgot to upload secrets from your " .
             "local machine to the deployment server.";
        exit();
    } elseif ($return === 3 || $return === 2) {
        http_response_code(401);
        echo "Password incorrect";
        exit();
    } else {
        http_response_code(502);
    }
    #header("Location: ${_SERVER['HTTP_VERACIOUX_STAGING_ROOT']}", true, 302);
    exit();
}
?>

<!-- Password submission form frontend. -->
<!DOCTYPE html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <title>Title</title>
    <style>
        body {
            padding: 32px;
        }

        .formContainer {
            margin: auto;
            text-align: center;
        }

        .formContainer, form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .formContainer * {
            margin: auto;
        }
    </style>
</head>
<body>
<div class="formContainer" style="margin: auto">
    Enter password to access staging environment:
    <form method="POST" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <input type="password" name="password"/>
        <input type="submit" value="Submit"/>
    </form>
</div>
</body>
</html>