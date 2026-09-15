import {
    AfterViewInit,
    Component,
    OnDestroy
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './project.html',
    styleUrl: './project.css'
})
export class Project implements AfterViewInit, OnDestroy {

    mouseX = 0;
    mouseY = 0;

    private observer?: IntersectionObserver;


    /**
     * Track mouse position
     * for the background glow.
     */
    onMouseMove(event: MouseEvent): void {

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

    }


    /**
     * Initialize viewport animations.
     */
    ngAfterViewInit(): void {

        this.initScrollReveal();

    }


    /**
     * Reveal project elements
     * when they enter the viewport.
     */
    private initScrollReveal(): void {

        if (
            typeof IntersectionObserver === 'undefined'
        ) {

            document
                .querySelectorAll('.reveal')
                .forEach((element) => {

                    element.classList.add(
                        'visible'
                    );

                });

            return;

        }


        const elements =
            document.querySelectorAll('.reveal');


        this.observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        'visible'
                                    );

                                this.observer?.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(
            (element) => {

                this.observer?.observe(
                    element
                );

            }
        );

    }


    /**
     * Cleanup observer.
     */
    ngOnDestroy(): void {

        this.observer?.disconnect();

    }

}
