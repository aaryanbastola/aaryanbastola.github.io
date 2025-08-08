from flask import Flask, render_template, send_from_directory, safe_join, abort
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

CERT_DIR = os.path.join(app.static_folder, 'certs')

def list_certificates():
    """Return list of certificate filenames in static/certs sorted."""
    if not os.path.isdir(CERT_DIR):
        return []
    files = [f for f in os.listdir(CERT_DIR) if os.path.isfile(os.path.join(CERT_DIR, f))]
    files.sort()
    return files

@app.route('/')
def index():
    certs = list_certificates()
    return render_template('index.html', certificates=certs)

# Optional: Serve certs directly (Flask static already serves them)
@app.route('/certs/<path:filename>')
def certs(filename):
    safe_path = safe_join(CERT_DIR, filename)
    if not os.path.exists(safe_path):
        abort(404)
    return send_from_directory(CERT_DIR, filename, as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True)
