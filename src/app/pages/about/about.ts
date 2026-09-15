import {
    AfterViewInit,
    Component,
    OnDestroy
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class About implements AfterViewInit, OnDestroy {

    mouseX = 0;
    mouseY = 0;

    private observer?: IntersectionObserver;


    /**
     * Update cursor glow position
     */
    onMouseMove(event: MouseEvent): void {

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

    }


    /**
     * Initialize scroll reveal after view loads
     */
    ngAfterViewInit(): void {

        this.initScrollReveal();

    }


    /**
     * Reveal elements when they enter the viewport
     */
    private initScrollReveal(): void {

        const elements =
            document.querySelectorAll('.about-page .reveal');


        /*
         * Fallback for browsers that do not support
         * IntersectionObserver.
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
                    threshold: 0.12
                }
            );


        elements.forEach((element) => {

            this.observer?.observe(element);

        });

    }


    /**
     * Cleanup IntersectionObserver
     */
    ngOnDestroy(): void {

        this.observer?.disconnect();

    }

}
