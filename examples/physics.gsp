{
	"metadata": {
		"version": 1,
		"generator": "GorlotProgram"
	},
	"geometries": [
		{
			"uuid": "75851200-6271-4B90-A784-DF7EF4560AF7",
			"type": "BoxBufferGeometry",
			"width": 2,
			"height": 2,
			"depth": 2
		},
		{
			"uuid": "3D7E8607-AE24-4998-9CB4-E4A95DC56C39",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1
		}],
	"materials": [
		{
			"uuid": "37265D84-7876-4986-8E8F-E8D2C9015B2D",
			"type": "MeshPhongMaterial",
			"name": "default",
			"color": 16777215,
			"emissive": 0,
			"specular": 1118481,
			"shininess": 30,
			"nodes": {
				"config": {},
				"groups": [],
				"last_link_id": 0,
				"last_node_id": 1,
				"links": [],
				"nodes": [
					{
						"flags": {},
						"id": 1,
						"mode": 0,
						"inputs": [
							{
								"name": "Colour",
								"type": "Color",
								"link": null
							},
							{
								"name": "Emissive",
								"type": "number",
								"link": null
							},
							{
								"name": "Reflectivity",
								"type": "number",
								"link": null
							},
							{
								"name": "Shininess",
								"type": "number",
								"link": null
							},
							{
								"name": "Specular",
								"type": "Color",
								"link": null
							},
							{
								"name": "Wireframe",
								"type": "Boolean",
								"link": null
							}],
						"outputs": [
							{
								"name": "Material",
								"type": "Material",
								"links": null
							}],
						"pos": [208,140],
						"properties": {
							"mat": "37265D84-7876-4986-8E8F-E8D2C9015B2D"
						},
						"size": [178,126],
						"type": "Material/MeshPhongMaterial"
					}],
				"version": 0.4
			}
		},
		{
			"uuid": "1CC76D52-A92E-49E7-A245-F01C5C219379",
			"type": "MeshPhongMaterial",
			"name": "default",
			"color": 16777215,
			"emissive": 0,
			"specular": 1118481,
			"shininess": 30,
			"nodes": {
				"config": {},
				"groups": [],
				"last_link_id": 0,
				"last_node_id": 1,
				"links": [],
				"nodes": [
					{
						"flags": {},
						"id": 1,
						"mode": 0,
						"inputs": [
							{
								"name": "Colour",
								"type": "Color",
								"link": null
							},
							{
								"name": "Emissive",
								"type": "number",
								"link": null
							},
							{
								"name": "Reflectivity",
								"type": "number",
								"link": null
							},
							{
								"name": "Shininess",
								"type": "number",
								"link": null
							},
							{
								"name": "Specular",
								"type": "Color",
								"link": null
							},
							{
								"name": "Wireframe",
								"type": "Boolean",
								"link": null
							}],
						"outputs": [
							{
								"name": "Material",
								"type": "Material",
								"links": null
							}],
						"pos": [208,140],
						"properties": {
							"mat": "1CC76D52-A92E-49E7-A245-F01C5C219379"
						},
						"size": [178,126],
						"type": "Material/MeshPhongMaterial"
					}],
				"version": 0.4
			}
		}],
	"object": {
		"uuid": "899B1FED-B1F3-4A95-BD2D-22FC710CFB81",
		"type": "Program",
		"name": "program",
		"components": [],
		"hidden": false,
		"castShadow": false,
		"receiveShadow": false,
		"visible": true,
		"matrixAutoUpdate": false,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "33DF0826-1CAB-48AF-9B38-CA9EE412DD98",
				"type": "Scene",
				"name": "scene",
				"components": [],
				"hidden": false,
				"castShadow": false,
				"receiveShadow": false,
				"visible": true,
				"matrixAutoUpdate": false,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "420808CE-71D9-4E37-BC88-DCB7C5EFF320",
						"type": "Sky",
						"auto_update": false,
						"day_time": 20,
						"sun_distance": 100,
						"time": 13,
						"components": [],
						"name": "sky",
						"castShadow": false,
						"receiveShadow": false,
						"visible": true,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
					},
					{
						"uuid": "AA36B9E9-697D-4068-BB34-F73AD4A72120",
						"type": "Mesh",
						"name": "ground",
						"components": [],
						"hidden": false,
						"castShadow": true,
						"receiveShadow": true,
						"visible": true,
						"matrixAutoUpdate": true,
						"matrix": [20,0,0,0,0,1,0,0,0,0,20,0,0,0,0,1],
						"geometry": "75851200-6271-4B90-A784-DF7EF4560AF7",
						"material": "37265D84-7876-4986-8E8F-E8D2C9015B2D"
					},
					{
						"uuid": "C9AC830D-B2FA-478E-B0CE-C8EB0A39D7A9",
						"type": "Physics",
						"name": "physics_1",
						"components": [],
						"hidden": false,
						"castShadow": false,
						"receiveShadow": false,
						"visible": true,
						"matrixAutoUpdate": true,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1.934000015258789,0,1],
						"children": [
							{
								"uuid": "2BCEAF9F-E564-404C-B9FB-0EB09E7A4B5A",
								"type": "Mesh",
								"name": "box",
								"components": [],
								"hidden": false,
								"castShadow": true,
								"receiveShadow": true,
								"visible": true,
								"matrixAutoUpdate": true,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
								"geometry": "75851200-6271-4B90-A784-DF7EF4560AF7",
								"material": "37265D84-7876-4986-8E8F-E8D2C9015B2D"
							}],
						"body": {
							"type": 4,
							"mass": 0.5,
							"linearDamping": 0.01,
							"angularDamping": 0.01,
							"sleepSpeedLimit": 0.1,
							"sleepTimeLimit": 1,
							"collisionFilterGroup": 1,
							"collisionFilterMask": 1,
							"fixedRotation": false,
							"collisionResponse": true
						},
						"shapes": {}
					},
					{
						"uuid": "DDD4E242-57B9-4121-BB0B-B7559239A24C",
						"type": "Script",
						"name": "script_7",
						"components": [],
						"hidden": false,
						"castShadow": false,
						"receiveShadow": false,
						"visible": true,
						"matrixAutoUpdate": true,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,5.9120001792907715,0,1],
						"mode": 1,
						"code": "var scene = ObjectUtils.getScene(this)\n\nconsole.log(scene)"
					},
					{
						"uuid": "C43372E7-1F75-46B3-8147-DC44E8E8591D",
						"type": "Physics",
						"name": "physics_5",
						"components": [],
						"hidden": false,
						"castShadow": false,
						"receiveShadow": false,
						"visible": true,
						"matrixAutoUpdate": true,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,13.281999588012695,0,1],
						"children": [
							{
								"uuid": "3052BEE2-C6EA-43DB-8CEF-5AE1C7F9219F",
								"type": "Mesh",
								"name": "cube_6",
								"components": [],
								"hidden": false,
								"castShadow": true,
								"receiveShadow": true,
								"visible": true,
								"matrixAutoUpdate": true,
								"matrix": [2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,1],
								"geometry": "3D7E8607-AE24-4998-9CB4-E4A95DC56C39",
								"material": "1CC76D52-A92E-49E7-A245-F01C5C219379"
							}],
						"body": {
							"type": 1,
							"mass": 0.5,
							"linearDamping": 0.01,
							"angularDamping": 0.01,
							"sleepSpeedLimit": 0.1,
							"sleepTimeLimit": 1,
							"collisionFilterGroup": 1,
							"collisionFilterMask": 1,
							"fixedRotation": false,
							"collisionResponse": true
						},
						"shapes": {}
					}],
				"fog_color": "#ffffff",
				"fog_density": 0.001,
				"fog_near": 2,
				"fog_far": 30,
				"fog_mode": 0
			}],
		"author": "",
		"description": "",
		"version": "0",
		"vr": false,
		"vr_scale": 1
	}
}