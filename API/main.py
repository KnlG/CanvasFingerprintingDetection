from flask import Flask, render_template
from flask import jsonify
from flask import request
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/check', methods = ['POST', 'OPTIONS'])
@cross_origin()
def check():
	cond1 = False
	cond2 = False
	cond3 = False
	cond4 = False
	scripts = request.get_json()
	for i in range(len(scripts)):
		js = scripts[i]
		# ------------1---------

		def width_height_finder(data):
		    w = re.compile('[^(line)]width', re.IGNORECASE)
		    h = re.compile('[^(line)]height', re.IGNORECASE)
		    ww = w.search(data)
		    hh = h.search(data)
		    if ww!= None:
		        return data
		    elif hh!=None:
		        return data

		MIN_CANVAS_IMAGE_WIDTH = 16
		MIN_CANVAS_IMAGE_HEIGHT = 16

		if (js["symbol"] in ["HTMLCanvasElement.width", "HTMLCanvasElement.height"]) and float(js["value"])>MIN_CANVAS_IMAGE_HEIGHT:
			cond1 = True
		#------------2---------

		def count_distinct_letters(text):
		    if text!=None:
		        # t = json.loads(text, encoding='utf-8')['0']
		        t = text[0]
		        if not isinstance(t, int):
		            return len(set(t))

		CANVAS_WRITE_FUNCS = [
		    "CanvasRenderingContext2D.fillText",
		    "CanvasRenderingContext2D.strokeText",
		    "CanvasRenderingContext2D.fill"
		    ]
		if (js["symbol"] in CANVAS_WRITE_FUNCS) and count_distinct_letters(js["arguments"])>=10:
			cond2 = True


		#------------3---------
		CANVAS_FP_DO_NOT_CALL_LIST = ["CanvasRenderingContext2D.save",
		                              "CanvasRenderingContext2D.restore",
		                              "HTMLCanvasElement.addEventListener"]

		if not (js["symbol"] in CANVAS_FP_DO_NOT_CALL_LIST):
			cond3 = True

		# --------------- 4 -------------
		CANVAS_READ_FUNCS = [
		    "HTMLCanvasElement.toDataURL",
		    "CanvasRenderingContext2D.getImageData"
		    ]

		def check_dimensions(image):
			img = json.loads(image)
			if img!=None:
				if len(img)>3:
					print("THIS IS LENGTH",len(img), img)
					if img[2]>=16 and img[3]>=16:
						return img
				else:
					return img

		if (js["symbol"] in CANVAS_READ_FUNCS) and check_dimensions(js["arguments"]):
			cond4 = True
	result = False
	if len(scripts)==0:
		response = jsonify({"result": result})
	else:
		if cond2 and cond3:
			result = True
		elif cond3 and cond4:
			result = True
		elif cond2 and cond4:
			result = True
		response = jsonify({"result": result, "url": js["url"]})
	# response.headers.add('Access-Control-Allow-Origin', '*')
	# response.headers['Connection'] = 'close'
	return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)