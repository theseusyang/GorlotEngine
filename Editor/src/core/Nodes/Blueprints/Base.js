//(function(global) {
    //var LiteGraph = global.LiteGraph;

    /* Number ****************/

    function WidgetNumber() {
        this.addOutput("", "number");
        this.size = [80, 60];
        this.properties = { min: -1000, max: 1000, value: 1, step: 1 };
        this.old_y = -1;
        this._remainder = 0;
        this._precision = 0;
        this.mouse_captured = false;
    }

    WidgetNumber.title = "Number";
    WidgetNumber.desc = "Widget to select number value";

    WidgetNumber.pixels_threshold = 10;
    WidgetNumber.markers_color = "#666";

    WidgetNumber.prototype.onDrawForeground = function(ctx) {
        var x = this.size[0] * 0.5;
        var h = this.size[1];
        if (h > 30) {
            ctx.fillStyle = WidgetNumber.markers_color;
            ctx.beginPath();
            ctx.moveTo(x, h * 0.1);
            ctx.lineTo(x + h * 0.1, h * 0.2);
            ctx.lineTo(x + h * -0.1, h * 0.2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, h * 0.9);
            ctx.lineTo(x + h * 0.1, h * 0.8);
            ctx.lineTo(x + h * -0.1, h * 0.8);
            ctx.fill();
            ctx.font = (h * 0.7).toFixed(1) + "px Arial";
        } else {
            ctx.font = (h * 0.8).toFixed(1) + "px Arial";
        }

        ctx.textAlign = "center";
        ctx.font = (h * 0.7).toFixed(1) + "px Arial";
        ctx.fillStyle = "#EEE";
        ctx.fillText(
            this.properties.value.toFixed(this._precision),
            x,
            h * 0.75
        );
    };

    WidgetNumber.prototype.onExecute = function() {
        this.setOutputData(0, this.properties.value);
    };

    WidgetNumber.prototype.onPropertyChanged = function(name, value) {
        var t = (this.properties.step + "").split(".");
        this._precision = t.length > 1 ? t[1].length : 0;
    };

    WidgetNumber.prototype.onMouseDown = function(e, pos) {
        if (pos[1] < 0) {
            return;
        }

        this.old_y = e.canvasY;
        this.captureInput(true);
        this.mouse_captured = true;

        return true;
    };

    WidgetNumber.prototype.onMouseMove = function(e) {
        if (!this.mouse_captured) {
            return;
        }

        var delta = this.old_y - e.canvasY;
        if (e.shiftKey) {
            delta *= 10;
        }
        if (e.metaKey || e.altKey) {
            delta *= 0.1;
        }
        this.old_y = e.canvasY;

        var steps = this._remainder + delta / WidgetNumber.pixels_threshold;
        this._remainder = steps % 1;
        steps = steps | 0;

        var v = Math.clamp(
            this.properties.value + steps * this.properties.step,
            this.properties.min,
            this.properties.max
        );
        this.properties.value = v;
        this.graph._version++;
        this.setDirtyCanvas(true);
    };

    WidgetNumber.prototype.onMouseUp = function(e, pos) {
        if (e.click_time < 200) {
            var steps = pos[1] > this.size[1] * 0.5 ? -1 : 1;
            this.properties.value = Math.clamp(
                this.properties.value + steps * this.properties.step,
                this.properties.min,
                this.properties.max
            );
            this.graph._version++;
            this.setDirtyCanvas(true);
        }

        if (this.mouse_captured) {
            this.mouse_captured = false;
            this.captureInput(false);
        }

        if (this.graph && this.graph.onNodeConnectionChange) {
            this.graph.onNodeConnectionChange()
        }
    };

    //Constant
    function ConstantNumber() {
        this.addOutput("value", "number");
        this.addProperty("value", 1.0);
        this.widget = this.addWidget("number","value",1,"value");
        this.widgets_up = true;
        this.size = [180, 30];
    }

    ConstantNumber.title = "Float";
    ConstantNumber.desc = "Constant number";

    ConstantNumber.prototype.onExecute = function() {
        this.setOutputData(0, parseFloat(this.properties["value"]));
    };

    ConstantNumber.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return this.properties.value;
        }
        return this.title;
    };

    ConstantNumber.prototype.setValue = function(v)
    {
        this.setProperty("value",v);
    }

    ConstantNumber.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.outputs[0].label = this.properties["value"].toFixed(3);
    };

    function ConstantString() {
        this.addOutput("", "Text");
        this.addProperty("value", "");
        this.widget = this.addWidget("text","value","","value");  //link to property value
        this.widgets_up = true;
        this.size = [180, 30];
    }

    ConstantString.title = "String";
    ConstantString.desc = "Constant string";

    ConstantString.prototype.getTitle = ConstantNumber.prototype.getTitle;

    ConstantString.prototype.onExecute = function() {
        this.setOutputData(0, this.properties["value"]);
    };

    ConstantString.prototype.setValue = ConstantNumber.prototype.setValue;

    ConstantString.prototype.onDropFile = function(file)
    {
        var that = this;
        var reader = new FileReader();
        reader.onload = function(e)
        {
            that.setProperty("value",e.target.result);
        }
        reader.readAsText(file);
    }

    // Console.log
    function ConsoleLogNode() {
        this.addInput("In", null)
    }

    ConsoleLogNode.title = "Print to console"

    ConsoleLogNode.prototype.onExecute = function() {
        console.log(this.getInputData(0))
    }

// ** Boolean *****

    function ConstantBoolean() {
        this.addOutput("", "Boolean")
        this.addProperty("value", true)
        this.widget = this.addWidget("toggle", "value", true, "value")
        this.widgets_up = true
        this.size = [140, 30]
    }
    ConstantBoolean.title = "Boolean"
    ConstantBoolean.desc = "Boolean"
    ConstantBoolean.prototype.onExecute = function() {
        this.setOutputData(0, this.properties["value"])
    }
    ConstantBoolean.prototype.setValue = ConstantNumber.prototype.setValue
    ConstantBoolean.prototype.onAction = function(action) {
        this.setValue(!this.properties.value)
    }

    /* Combo ****************/

    function WidgetCombo() {
        this.addOutput("", "string");
        this.addOutput("change", LiteGraph.EVENT);
        this.size = [80, 60];
        this.properties = { value: "A", values:"A;B;C" };
        this.old_y = -1;
        this.mouse_captured = false;
        this._values = this.properties.values.split(";");
        var that = this;
        this.widgets_up = true;
        this.widget = this.addWidget("combo","", this.properties.value, function(v){
            that.properties.value = v;
            that.triggerSlot(1, v);
        }, { property: "value", values: this._values } );
    }

    WidgetCombo.title = "Combo";
    WidgetCombo.desc = "Widget to select from a list";

    WidgetCombo.prototype.onExecute = function() {
        this.setOutputData( 0, this.properties.value );
    };

    WidgetCombo.prototype.onPropertyChanged = function(name, value) {
        if(name == "values")
        {
            this._values = value.split(";");
            this.widget.options.values = this._values;
        }
        else if(name == "value")
        {
            this.widget.value = value;
        }

        if (this.graph && this.graph.onNodeConnectionChanged) {
            this.graph.onNodeConnectionChanged()
        }
    };


    /* Knob ****************/

    function WidgetKnob() {
        this.addOutput("", "number");
        this.size = [64, 84];
        this.properties = {
            min: 0,
            max: 1,
            value: 0.5,
            color: "#7AF",
            precision: 2
        };
        this.value = -1;
    }

    WidgetKnob.title = "Knob";
    WidgetKnob.desc = "Circular controller";
    WidgetKnob.size = [80, 100];

    WidgetKnob.prototype.onDrawForeground = function(ctx) {
        if (this.flags.collapsed) {
            return;
        }

        if (this.value == -1) {
            this.value =
                (this.properties.value - this.properties.min) /
                (this.properties.max - this.properties.min);
        }

        var center_x = this.size[0] * 0.5;
        var center_y = this.size[1] * 0.5;
        var radius = Math.min(this.size[0], this.size[1]) * 0.5 - 5;
        var w = Math.floor(radius * 0.05);

        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(center_x, center_y);
        ctx.rotate(Math.PI * 0.75);

        //bg
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, Math.PI * 1.5);
        ctx.fill();

        //value
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.properties.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(
            0,
            0,
            radius - 4,
            0,
            Math.PI * 1.5 * Math.max(0.01, this.value)
        );
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.restore();

        //inner
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(center_x, center_y, radius * 0.75, 0, Math.PI * 2, true);
        ctx.fill();

        //miniball
        ctx.fillStyle = this.mouseOver ? "white" : this.properties.color;
        ctx.beginPath();
        var angle = this.value * Math.PI * 1.5 + Math.PI * 0.75;
        ctx.arc(
            center_x + Math.cos(angle) * radius * 0.65,
            center_y + Math.sin(angle) * radius * 0.65,
            radius * 0.05,
            0,
            Math.PI * 2,
            true
        );
        ctx.fill();

        //text
        ctx.fillStyle = this.mouseOver ? "white" : "#AAA";
        ctx.font = Math.floor(radius * 0.5) + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            this.properties.value.toFixed(this.properties.precision),
            center_x,
            center_y + radius * 0.15
        );
    };

    WidgetKnob.prototype.onExecute = function() {
        this.setOutputData(0, this.properties.value);
        this.boxcolor = LiteGraph.colorToString([
            this.value,
            this.value,
            this.value
        ]);
    };

    WidgetKnob.prototype.onMouseDown = function(e) {
        this.center = [this.size[0] * 0.5, this.size[1] * 0.5 + 20];
        this.radius = this.size[0] * 0.5;
        if (
            e.canvasY - this.pos[1] < 20 ||
            LiteGraph.distance(
                [e.canvasX, e.canvasY],
                [this.pos[0] + this.center[0], this.pos[1] + this.center[1]]
            ) > this.radius
        ) {
            return false;
        }
        this.oldmouse = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]];
        this.captureInput(true);
        return true;
    };

    WidgetKnob.prototype.onMouseMove = function(e) {
        if (!this.oldmouse) {
            return;
        }

        var m = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]];

        var v = this.value;
        v -= (m[1] - this.oldmouse[1]) * 0.01;
        if (v > 1.0) {
            v = 1.0;
        } else if (v < 0.0) {
            v = 0.0;
        }
        this.value = v;
        this.properties.value =
            this.properties.min +
            (this.properties.max - this.properties.min) * this.value;
        this.oldmouse = m;
        this.setDirtyCanvas(true);
    };

    WidgetKnob.prototype.onMouseUp = function(e) {
        if (this.oldmouse) {
            this.oldmouse = null;
            this.captureInput(false);
        }
    };

    WidgetKnob.prototype.onPropertyChanged = function(name, value) {
        if (name == "min" || name == "max" || name == "value") {
            this.properties[name] = parseFloat(value);
            return true; //block
        }

        if (this.graph && this.graph.onNodeConnectionChanged) {
            this.graph.onNodeConnectionChanged()
        }
    };

    //Show value inside the debug console
    function WidgetSliderGUI() {
        this.addOutput("", "number");
        this.properties = {
            value: 0.5,
            min: 0,
            max: 1,
            text: "V"
        };
        var that = this;
        this.size = [140, 40];
        this.slider = this.addWidget(
            "slider",
            "V",
            this.properties.value,
            function(v) {
                that.properties.value = v;
            },
            this.properties
        );
        this.widgets_up = true;
    }

    WidgetSliderGUI.title = "Slider";

    WidgetSliderGUI.prototype.onPropertyChanged = function(name, value) {
        if (name == "value") {
            this.slider.value = value;
        }

        if (this.graph && this.graph.onNodeConnectionChanged) {
            this.graph.onNodeConnectionChanged()
        }
    };

    WidgetSliderGUI.prototype.onExecute = function() {
        this.setOutputData(0, this.properties.value);
    };


    function registerBaseNodes() {
        LiteGraph.registerNodeType("Base/number", WidgetNumber);
        LiteGraph.registerNodeType("Base/Float", ConstantNumber);
        LiteGraph.registerNodeType("Base/String", ConstantString);
        LiteGraph.registerNodeType("Base/Boolean", ConstantBoolean)
        LiteGraph.registerNodeType("Base/ConsoleLog", ConsoleLogNode)

        LiteGraph.registerNodeType("Base/combo", WidgetCombo);
        LiteGraph.registerNodeType("Base/knob", WidgetKnob);
        LiteGraph.registerNodeType("Base/internal_slider", WidgetSliderGUI);
    }


//})(this);
