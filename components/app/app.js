import { Router } from "../../utils/router.js";

export class App {
  constructor(hostElement) {
    this.hostElement = hostElement;
    this.router = new Router([]);
    this.template = ``;

    // Fetch the data and then render
    this.fetchData().then((data) => {
      this.render(data);
    });
  }

  async fetchData() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/lopendres2/lopendres2.github.io/main/data/data.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  render(data) {
    this.hostElement.innerHTML = this.template;

    this.router.add("Home", () => {
      this.hostElement.innerHTML = "";
      import("../home/home.js").then(({ Home }) => {
        new Home(data, this.hostElement).render();
      }).catch(error => {
        console.error("Error loading Home component:", error);
      });
    });

    this.router.add("About", () => {
      this.hostElement.innerHTML = "";
      import("../about/about.js").then(({ About }) => {
        new About(data, this.hostElement).render();
      }).catch(error => {
        console.error("Error loading About component:", error);
      });
    });

    // Ensure the router checks the current hash and loads the correct route
    this.router.onHashChange();
  }
}
