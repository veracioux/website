if tem var -q target:prod
    set -g worker worker.veracioux.me
    set -g web    veracioux.me
    set -g api    api.veracioux.me
    set -g fe     veracioux.me
else if tem var -q target:local
    set -g worker worker.localhost:5000
    set -g web    localhost:5000
    set -g api    api.localhost:5000
    set -g fe     localhost:5000
else
    set -g worker localhost:8001
    set -g web    localhost:8000
    set -g api    localhost:8000/api
    set -g fe     localhost:8080
end

