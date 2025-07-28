from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

# Predefined zip code priority levels
ZIP_PRIORITY = {
    "33101": 5,
    "33125": 4,
    "33130": 3,
    "33133": 2,
    "33135": 1
}

# Simulated incident data
INCIDENTS = [
    {"zip": "33101", "type": "fire"},
    {"zip": "33133", "type": "medical"},
    {"zip": "33130", "type": "rescue"}
]

def allocate_resources(incidents):
    # Sort based on priority
    scored = sorted(incidents, key=lambda x: ZIP_PRIORITY.get(x['zip'], 0), reverse=True)
    return scored

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/incidents")
def get_incidents():
    ordered = allocate_resources(INCIDENTS)
    return jsonify(ordered)

@app.route("/api/add_incident", methods=["POST"])
def add_incident():
    data = request.json
    if 'zip' in data and 'type' in data:
        INCIDENTS.append(data)
        return jsonify({"status": "success", "incident": data}), 200
    return jsonify({"status": "error", "message": "Invalid data"}), 400

if __name__ == "__main__":
    app.run(debug=True)
