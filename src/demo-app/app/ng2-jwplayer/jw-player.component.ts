//https://developer.jwplayer.com/jw-player/docs/developer-guide/api/javascript_api_reference/#buffer



import {
    Component,
    EventEmitter,
    Input,
    Output,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from "@angular/core";

import { LocalStorageService } from "../services";

declare var jwplayer: any;

@Component({
    template: require("./jw-player.component.html"),
    styles: [require("./jw-player.component.scss")],
    selector: "jw-player"
})
export class JwPlayerComponent implements AfterViewInit, OnDestroy {
    constructor(private _elementRef: ElementRef) {
        
    }

    private _items: Array<any> = null;

    @Input() public title: string;

    @Input() public file: string;

    @Input() public height: string;

    @Input() public width: string;
    

    @Output() public bufferChange: EventEmitter<any> = new EventEmitter();

    @Output() public complete: EventEmitter<any> = new EventEmitter();

    @Output() public buffer: EventEmitter<any> = new EventEmitter();

    @Output() public error: EventEmitter<any> = new EventEmitter<any>();

    @Output() public play: EventEmitter<any> = new EventEmitter<any>();

    @Output() public start: EventEmitter<any> = new EventEmitter<any>();

    @Output() public fullscreen: EventEmitter<any> = new EventEmitter<any>();

    
    private _player: any = null;

    @Input() public seek: number;

    @Output() public time: EventEmitter<any> = new EventEmitter<any>();
    
    public get position() { return LocalStorageService.Instance.get({ name: "jw-player-position" }); }

    public set position(value: number) {
        LocalStorageService.Instance.put({ name: "jw-player-position", value: value });        
    }

    public handleEventsFor = (player: any) => {
        player.onTime(this.onTime);
        player.onReady(this.onReady);
    }

     
    public onTime = (options: { duration: number, position: number }) => {
        this.time.emit(options);
    }


    public get player(): any {        
        this._player = this._player || jwplayer(this._elementRef.nativeElement);
        return this._player;
    }

    ngAfterViewInit() {
        this.player.setup({
            file: this.file,
            height: this.height,
            width: this.width
        });
        this.handleEventsFor(this.player);        
    }

    ngOnDestroy() {

    }


    public onComplete = (options: {}) => this.complete.emit(options);

    public onError = () => this.error.emit();       

    public onBufferChange = (options: {
        duration: number,
        bufferPercent: number,
        position: number,
        metadata?: number
    }) => this.bufferChange.emit(options);

    public onBuffer = (options: {
        oldState: string,
        newState: string,
        reason: string
    }) => this.buffer.emit();

    public onReady = (options: {
        oldState: string,
        newState: string,
        reason: string
    }) => {
        this.player.seek(this.seek || 0);        
    };

    public onFullScreen = (options: {
        oldState: string,
        newState: string,
        reason: string
    }) => this.buffer.emit();

    public onPlay = (options: {
    }) => this.play.emit();
}
