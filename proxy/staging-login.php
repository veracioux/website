<?php
# Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    # Verify password
    exec("htpasswd -Bbv /var/www/auth/staging.htpasswd $username $password", $output, $return);
    if ($return === 0) {
        $_SESSION["authenticated"] = true;
        header("Location: ${_GET['redirect']}", response_code: 301);
        exit();
    } elseif ($return === 1) {
        http_response_code(501);
        echo "htpasswd file can't be accessed. Either this is served from a " .
            "development machine or you forgot to upload secrets from your " .
            "local machine to the deployment server.";
        exit();
    } else {
        http_response_code(401);
    }
}
?>

<!DOCTYPE html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <title>Staging login</title>
    <style>
        form {
            position: fixed;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }
    </style>
</head>
<body>
<form method="POST" action="/stg-login?<?php echo $_SERVER['QUERY_STRING']?>">
    <h2>Staging login</h2>
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" />
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" />
    <input type="submit" value="Submit" />
</form>
</body>
</html>

