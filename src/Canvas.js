import React, { Component } from "react";
import meme from "./imgs/meme.jpg";
import postcard1 from "./imgs/postcard1.png";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        // this.fitToContainer(canvas);
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;

        img.onload = () => {
            ctx.font = "35px Prompt";
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height, // source rectangle
                0,
                0,
                canvas.width,
                canvas.height
            ); // destination rectangle
            ctx.fillText(this.props.text, 550, 185);
        };
    }

    componentDidUpdate() {
        
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "35px Prompt";

        // canvas.width = canvas.width;

        ctx.fillStyle = "black";
        ctx.fillText(this.props.text, 550, 185);
        
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(" ");
        var line = "";

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + " ";
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

    fitToContainer(canvas) {
        // Make it visually fill the positioned parent
        canvas.style.width = "100%";
        console.log(canvas.width);
        canvas.style.height = canvas.width / 0.69230769230769 + "px";
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    render() {
        return (
            <div className="">
                <canvas ref={this.canvas} width={1040} height={720} />
                <img ref="image" src={postcard1} className="hidden" />
            </div>
        );
    }
}
export default Canvas;
