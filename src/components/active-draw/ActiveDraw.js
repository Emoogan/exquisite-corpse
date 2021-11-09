import React from "react";

export default class ActiveDraw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            offsetX: 0,
            offsetY: 0,
            startX: 0,
            startY: 0
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.canvasRef = React.createRef();
        this.ctx = null;

    }

    componentDidMount() {
        let canvasRef = this.canvasRef.current;
        let canvasRect = canvasRef.getBoundingClientRect();
        this.ctx = canvasRef.getContext("2d");
        this.setState({ offsetX: canvasRect.left, offsetY: canvasRect.top });
    }

    handleMouseDown(e) {
        let ctx = this.ctx;
        this.setState({ isDrawing: true });
        ctx.beginPath();
        ctx.strokeStyle = this.props.color;
        ctx.lineWidth = this.props.lineWidth;
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.moveTo(
            e.clientX - this.state.offsetX,
            e.clientY - this.state.offsetY
        );
    }

    handleMouseMove(e) {
        let ctx = this.ctx;
        if (this.state.isDrawing) {
            ctx.lineTo(
                e.clientX - this.state.offsetX,
                e.clientY - this.state.offsetY
            );
            ctx.stroke();
        }
    }

    handleMouseUp(e) {
        let ctx = this.ctx;
        ctx.closePath();
        this.setState({ isDrawing: false });
    }

    render() {
        return (
            <div className="content">

                <div className="canvas">
                    <canvas
                        className="canvas-actual"
                        width={this.props.dimension[0] + 'px'}
                        height={this.props.dimension[1] + 'px'}
                        ref={this.canvasRef}
                        onMouseDown={this.handleMouseDown}
                        onMouseMove={this.handleMouseMove}
                        onMouseUp={this.handleMouseUp}
                    />
                </div>
            </div>
        );
    }
}