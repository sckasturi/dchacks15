from app import app
import base64
from flask import request
import exifread
import sqlite3
import hashlib
import exif
conn = sqlite3.connect("photo.db")
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS photos (filename, sha, file, exif, lat, long)")
conn.commit()

@app.route('/import', methods= ['POST']) 
def import_objects():        
        file = request.files['file']
        print 'uploading file ' + file.filename
	if file and allowed_file(file.filename):
            content = file.read()
	    exifdata = exif.get_exif_data(content)
	    #tags = exifread.process_file(file)
            #for tag in tags.keys():
            #    if tag not in ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote'):
            #        exif[tag] = tags[tag]
            sha = hashlib.sha256(content).hexdigest()
	    crdts = exif.get_lat_lon(exifdata)
	    c.execute("INSERT INTO photos VALUES (file.filename, content, file, str(exifdata), crdts[0], crdts[1])")
	    conn.commit()
            return str(crdts)
        else:
            return "nope.js"
	conn.close()

	
@app.route('/index')
def index():
    return "hello world"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ["jpg", "jpeg", "JPG"]

