import {
  AfterViewInit,
  Component
} from '@angular/core';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.html',
  styleUrl: './skill.css',
})
export class Skill implements AfterViewInit {

  mouseX = 0;
  mouseY = 0;

  /**
   * Tracks the mouse position so the background
   * glow follows the user's cursor.
   */
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  /**
   * Adds a small reveal effect when skill cards
   * enter the viewport.
   */
  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const cards =
      document.querySelectorAll('.reveal-card');

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });
  }
}
