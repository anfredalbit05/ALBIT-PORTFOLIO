import {
    AfterViewInit,
    Component,
    HostListener
} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements AfterViewInit {

    mouseX = 0;
    mouseY = 0;


    /*
    |--------------------------------------------------------------------------
    | Mouse Glow
    |--------------------------------------------------------------------------
    */

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

    }


    /*
    |--------------------------------------------------------------------------
    | Scroll Reveal
    |--------------------------------------------------------------------------
    */

    ngAfterViewInit(): void {

        this.initScrollReveal();

    }


    private initScrollReveal(): void {

        const elements =
            document.querySelectorAll('.reveal');

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                'visible'
                            );

                            observer.unobserve(
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

            observer.observe(element);

        });

    }

}
