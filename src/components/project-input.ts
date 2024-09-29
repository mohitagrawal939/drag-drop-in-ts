import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { Validatable, validate } from "../util/validation";
import { Component } from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
        };
        const peopleValidatatble: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 500,
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatatble)
        ) {
            if (!validate(titleValidatable)) {
                alert("Invalid project title !!!");
            } else if (!validate(descriptionValidatable)) {
                alert("Invalid project description !!!");
            } else if (!validate(peopleValidatatble)) {
                alert("Invalid project people !!!");
            } else {
                alert("Invalid input, Please try again !!!");
            }
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
