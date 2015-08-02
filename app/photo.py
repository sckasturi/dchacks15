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
c.execute("CREATE TABLE IF NOT EXISTS lat (lat, amt)")
c.execute("CREATE TABLE IF NOT EXISTS long (long, amt)")
conn.commit()
conn.close()

def truncate(f, n):
    '''Truncates/pads a float f to n decimal places without rounding'''
    s = '{}'.format(f)
    if 'e' in s or 'E' in s:
        return '{0:.{1}f}'.format(f, n)
    i, p, d = s.partition('.')
    return '.'.join([i, (d+'0'*n)[:n]])

@app.route('/import', methods= ['POST']) 
def import_objects(): 
        conn = sqlite3.connect("photo.db")
        c = conn.cursor()       
        file = request.files['file']
        print 'uploading file ' + file.filename
	if file and allowed_file(file.filename):
            content = file.read()
	    exifdata = exif.get_exif_data(content)
	    #tags = exifread.process_file(file)
            #for tag in tags.keys():
            #    if tag not in ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote'):
            #        exif[tag] = tags[tag]
            sha = str(hashlib.sha256(content).hexdigest())
	    crdts = exif.get_lat_lon(exifdata)
            lat = int(crdts[0])
            long = crdts[1]
            print lat
            if c.execute("SELECT amt FROM lat WHERE lat = ?", (truncate(lat, 2),)) == 1:
                c.execute("UPDATE lat SET amt = amt + 1 WHERE lat = ?", (truncate(lat, 2),))
            else:
                c.execute("INSERT INTO lat(lat, amt) VALUES (?, 1)", (truncate(lat,2),))
            if c.execute("SELECT amt FROM long WHERE long = ?", (truncate(long, 2),)) == 1:
                c.execute("UPDATE long SET amt = amt + 1 WHERE long = ?", (truncate(long, 2),))
            else:
                c.execute("INSERT INTO long(long, amt) VALUES (?, 1)", (truncate(long,2),))
            #c.execute("INSERT INTO photos VALUES (?, ?, ?, ?, ?, ?)",  (file.filename, sha, file, str(exifdata), lat, long))
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

