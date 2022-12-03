set -l services web api worker db frontend_dev rabbitmq worker_dotfiles mail docker-registry

complete -c up   -f -a "$services"
complete -c down -f -a "$services"
complete -c into -f -a "$services"

complete -c lpass -f -a "(ls (tem find -b website)/.tem/files/passwords | string replace .gpg '')"

complete -c curl -a "https://veracioux.me/"
