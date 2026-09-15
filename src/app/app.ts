import {
    AfterViewInit,
    Component,
    OnDestroy,
    signal
} from '@angular/core';

import {
    RouterOutlet,
    RouterLink,
    RouterLinkActive
} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {

    protected readonly title = signal('my-portfolio');

    menuOpen = false;

    mouseX = 0;
    mouseY = 0;

    private observer?: IntersectionObserver;


    /**
     * =========================
     * MOBILE MENU
     * =========================
     */

    toggleMenu(): void {

        this.menuOpen = !this.menuOpen;

    }


    closeMenu(): void {

        this.menuOpen = false;

    }


    /**
     * =========================
     * MOUSE MOVEMENT
     * =========================
     *
     * Used by the global cursor glow
     * in app.html / app.css.
     */

    onMouseMove(event: MouseEvent): void {

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

    }


    /**
     * =========================
     * INITIALIZE
     * =========================
     */

    ngAfterViewInit(): void {

        this.initScrollReveal();

    }


    /**
     * =========================
     * SCROLL REVEAL
     * =========================
     */

    private initScrollReveal(): void {

        const elements =
            document.querySelectorAll(
                '.app-shell .app-reveal'
            );


        /*
         * Fallback when IntersectionObserver
         * is not supported.
         */

        if (
            typeof IntersectionObserver === 'undefined'
        ) {

            elements.forEach((element) => {

                element.classList.add('visible');

            });

            return;

        }


        this.observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add('visible');

                            this.observer?.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );


        elements.forEach((element) => {

            this.observer?.observe(element);

        });

    }


    /**
     * =========================
     * CLEANUP
     * =========================
     */

    ngOnDestroy(): void {

        this.observer?.disconnect();

    }

}
