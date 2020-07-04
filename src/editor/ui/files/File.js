class File {
	constructor(name) {
		this.name = name
		this.attachedTo = null

		this.img = document.createElement("img")
		this.img.style.width = "60px"
		this.img.style.height = "60px"
	}

	attachAsset(asset) {
		if (asset.icon !== undefined) {
			this.img.src = asset.icon
		}

		this.attachedTo = asset
	}

	getObject() {
		var obj = {
			title: this.name,
			icon: this.img,
			attachedTo: this.attachedTo,
			style: "width: 60px; max-width: 60px; display: inline-block; text-align: center; margin-right: 10px",
			icon_style: "width:50px; height: 50px;"
		}
		return obj
	}
}