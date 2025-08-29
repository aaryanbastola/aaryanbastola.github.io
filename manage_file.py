#!/usr/bin/env python3
"""
manage_files.py
Ensures cv.pdf exists and certificates are placed in ./certs/
"""

import os, shutil

# Map uploaded source → target filename
SOURCE_TO_TARGET = {
    "4c28bef3-28b2-4209-b7c7-04f8d24220c6.pdf": "certificate1.pdf",  # Networking Basics
    "7ffb3b55-9e78-4888-ab95-98243c4e1d0e.pdf": "certificate2.pdf",  # IoT & Digital Transformation
    "470a25e2-5981-47ec-ae04-50a23bf1f58a.pdf": "certificate3.pdf",  # Ethical Hacker
    "C:\\Users\\LENOVO\\Downloads\\cert.pdf": "certificate4.pdf",     # Intro to Cybersecurity
}

POSSIBLE_CV_NAMES = [
    "Aaryan_Bastola_Resume.pdf","Aaryan_Bastola_CV.pdf",
    "resume.pdf","CV.pdf","aaryan_cv.pdf","aaryan_resume.pdf"
]

def ensure_cv_exists():
    if os.path.exists("cv.pdf"):
        print("✅ cv.pdf already exists."); return True
    for name in POSSIBLE_CV_NAMES:
        if os.path.exists(name):
            shutil.copy2(name,"cv.pdf")
            print(f"✅ Copied {name} ➜ cv.pdf"); return True
    print("⚠️ cv.pdf not found."); return False

def ensure_certs():
    os.makedirs("certs", exist_ok=True)
    moved, missing = [], []
    for src, target in SOURCE_TO_TARGET.items():
        if os.path.exists(src):
            dst = os.path.join("certs", target)
            shutil.copy2(src, dst)
            print(f"✅ {src} ➜ {dst}")
            moved.append(target)
        else:
            missing.append(src)
    return moved, missing

if __name__=="__main__":
    print("→ Managing files...")
    ensure_cv_exists()
    moved, missing = ensure_certs()
    print("\n--- Summary ---")
    if moved: print("Placed:", *moved, sep="\n - ")
    if missing: print("Missing:", *missing, sep="\n - ")
