import {
    Component,
    Input,
    ElementRef,
    AfterViewInit
} from "@angular/core";

declare var jwplayer: any;

@Component({
    template: require("./jw-player.component.html"),
    styles: [require("./jw-player.component.scss")],
    selector: "jw-player"
})
export class JwPlayerComponent implements AfterViewInit {
    constructor(private _elementRef: ElementRef) { }

    @Input("file")
    public file: string;

    @Input("height")
    public height: string;

    @Input("width")
    public width: string;

    public get player() { return jwplayer(this._elementRef.nativeElement); }

    ngAfterViewInit() {
        this.player.setup({
            file: this.file,
            height: this.height,
            width: this.width,
            "skin": {
                "name": "Roundster"
            }
        });
    }
}
