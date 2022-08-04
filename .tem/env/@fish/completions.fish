set -l services web db rabbitmq worker_dotfiles mail docker-registry

complete -c up   -f -a "$services"
complete -c down -f -a "$services"
complete -c into -f -a "$services"

complete -c lpass -f -a "(ls (tem find -b veracioux-website)/.tem/files/passwords | string replace .gpg '')"
