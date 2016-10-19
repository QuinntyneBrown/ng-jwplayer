//https://developer.jwplayer.com/jw-player/docs/developer-guide/api/javascript_api_reference/#buffer

import {
    Component,
    Input,
    ElementRef,
    AfterViewInit
} from "@angular/core";

declare var jwplayer: any;

@Component({
    templateUrl: "./jw-player.component.html",
    styleUrls: ["./jw-player.component.css"],
    selector: "jw-player"
})
export class JwPlayerComponent implements AfterViewInit {
    constructor(private _elementRef: ElementRef) { }

    @Input() public file: string;

    @Input() public height: string;

    @Input() public width: string;
    
    public get player():any { return jwplayer(this._elementRef.nativeElement); }

    ngAfterViewInit() {
        this.player.setup({
            file: this.file,
            height: this.height,
            width: this.width
        });

        this.handleEventsFor(this.player);
    }

    public handleEventsFor = (player: any) => {
        this.onComplete = player.onComplete;
        this.onBufferChange = player.onBufferChange;
        this.onBuffer = player.onBuffer;
    }

    public onComplete(options: {}) {
        alert("complete!");
    }

    public onBufferChange(options: {
        duration: number,
        bufferPercent: number,
        position: number,
        metadata?: number
    }) {

    }

    public onBuffer(options: {
        oldState: string,
        newState: string,
        reason: string
    }) {

    }
}
