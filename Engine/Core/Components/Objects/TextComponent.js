"use strict"

function TextComponent() {
        Component.call(this)

        this.component_name = "Text"
        this.className = "TextComponent"

        this.values = {
                text: "text"
        }
}

TextComponent.prototype = Object.create(Component.prototype)

TextComponent.prototype.initUI = function(pos, obj) {
        // Clear the element
        this.clearElement()

        this.widgetsPos = pos

        // Self pointer
        var self = this
        this.obj = obj

        // Form
        this.form = new Form(this.element)
        this.form.spacing.set(5, 5)

        // Displays this component name
        this.form.addText(this.component_name)
        this.form.nextRow()

        // Text
        this.form.addText("Text")
        this.text = new TextBox(this.form.element)
        this.text.size.set(200, 18)
        this.text.setOnChange(() => {
                if(self.obj !== null) {
                        self.obj.setText(self.text.getText())
                }
        })
        this.form.add(this.text)
        this.form.nextRow()

        // Set position and update interface
        this.form.position.copy(this.widgetsPos)
        this.form.updateInterface()

        this.widgetsPos.y += this.form.size.y
        this.addResetButton()

        return this.element
}

TextComponent.prototype.updateData = function() {
        this.text.setText(this.obj.text)
}

TextComponent.prototype.onReset = function() {
        this.obj.setText(this.values.text)
        
        this.updateData()
        Editor.updateObjectViews()
}
