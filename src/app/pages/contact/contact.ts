import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  mouseX = 0;
  mouseY = 0;

  isSending = false;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  /**
   * Tracks the mouse position for the
   * background cursor glow.
   */
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  /**
   * Opens the user's default email client
   * with the submitted information.
   */
  submitForm(): void {

    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.subject ||
      !this.formData.message
    ) {
      return;
    }

    this.isSending = true;

    const recipient = 'anfredalbit110525@gmail.com';

    const subject = encodeURIComponent(
      this.formData.subject
    );

    const body = encodeURIComponent(
      `Hello Anfred,

Name: ${this.formData.name}
Email: ${this.formData.email}

Message:
${this.formData.message}`
    );

    const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

    window.location.href = mailto;

    setTimeout(() => {
      this.isSending = false;
    }, 1000);
  }
}
