<?php
if (isset($_SESSION["authenticated"]) && $_SESSION["authenticated"]) {
    http_response_code(204);
} else {
    http_response_code(401);
}
exit();