find . -type f -not -path "./node_modules/*" -not -path "./*.sh" -not -path "./build/*" -exec sed -i 's/http:\/\/localhost:3000/https\:\/\/api.fundstovote.com/g' {} +