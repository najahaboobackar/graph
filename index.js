const readline = require("readline");

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex, action = null) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
    if (action) {
      this.adjacencyList[vertex].action = action;
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  displayOptions(vertex) {
    if (this.adjacencyList[vertex]) {
      console.log(`Menu: ${vertex}`);
      let optionNumber = 1;
      for (let option of this.adjacencyList[vertex]) {
        console.log(`${optionNumber}. ${option}`);
        optionNumber++;
      }
    }
  }

  async performAction(vertex) {
    const action = this.adjacencyList[vertex].action;
    if (action) {
      console.log(action);

      if (action === "Choose One") {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const choice = await new Promise((resolve) => {
          rl.question("Choose an option by number: ", (answer) => {
            resolve(answer);
          });
        });

        if (choice === "1") {
          console.log("1. Enter your details");
          console.log("2. Return to Main Menu");

          const submenuChoice = await new Promise((resolve) => {
            rl.question("Choose an option by number: ", (answer) => {
              resolve(answer);
            });
          });

          if (submenuChoice === "1") {
            const firstName = await new Promise((resolve) => {
              rl.question("Enter your first name: ", (answer) => {
                resolve(answer);
              });
            });

            const lastName = await new Promise((resolve) => {
              rl.question("Enter your last name: ", (answer) => {
                resolve(answer);
              });
            });

            const age = await new Promise((resolve) => {
              rl.question("Enter your age: ", (answer) => {
                resolve(answer);
              });
            });

            console.log(`First Name: ${firstName}`);
            console.log(`Last Name: ${lastName}`);
            console.log(`Age: ${age}`);

            const submit = await new Promise((resolve) => {
              rl.question("Submit (yes/no): ", (answer) => {
                resolve(answer);
              });
            });

            if (submit.toLowerCase() === "yes") {
              console.log("Returning to the main menu.");
            }
          }
        }

        rl.close();
      }
    }
  }
}

const graph = new Graph();
graph.addVertex("Main Menu");

// Submenu for "Main Menu"
graph.addVertex("Registration");
graph.addVertex("Contact");
graph.addVertex("Tracking ID");

// Actions for the submenu items
graph.addVertex("Registration", "Choose One");
graph.addVertex("Contact", "Display Email: najah@gmail.com");
graph.addVertex("Tracking ID", "Enter Shipment ID or Phone Number");

graph.addEdge("Main Menu", "Registration");
graph.addEdge("Main Menu", "Contact");
graph.addEdge("Main Menu", "Tracking ID");

graph.displayOptions("Main Menu");
console.log()
// Select an option and perform the associated action, e.g., await graph.performAction("Registration");
