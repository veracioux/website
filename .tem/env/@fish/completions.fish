set -l services web db rabbitmq worker_dotfiles

complete -c up   -f -a "$services"
complete -c down -f -a "$services"
complete -c into -f -a "$services"
