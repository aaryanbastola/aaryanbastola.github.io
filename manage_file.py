#!/usr/bin/env python3
"""
manage_files.py
Place cv.pdf into static/ and move your certificate PDFs into static/certs/
Run from project root.
"""
import os, shutil

ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC = os.path.join(ROOT, 'static')
CERTS_DIR = os.path.join(STATIC, 'certs')
IMAGES_DIR = os.path.join(STATIC, 'images')

os.makedirs(CERTS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

CERT_FILES = [
    "_certificate_aaryanbastola221-gmail-com_7354cbbe-1d15-419a-9dcc-c28a25c1d13d.pdf",
    "_certificate_aaryanbastola221-gmail-com_528379cc-5ed9-488b-9eb1-6d9440bdf1be.pdf",
    "_certificate_aaryanbastola221-gmail-com_d298558a-62ef-4702-8172-eeaf3aff6ea8.pdf",
    "_certificate_aaryanbastola221-gmail-com_fca4a681-d938-445a-bb12-eaab749d42eb.pdf"
]

POSSIBLE_CV_NAMES = [
    "cv.pdf", "CV.pdf", "Aaryan_Bastola_CV.pdf", "Aaryan_Bastola_Resume.pdf", "resume.pdf"
]

def ensure_cv():
    dest = os.path.join(STATIC, 'cv.pdf')
    if os.path.exists(dest):
        print("✅ static/cv.pdf already present.")
        return True
    for name in POSSIBLE_CV_NAMES:
        src = os.path.join(ROOT, name)
        if os.path.exists(src):
            shutil.copy2(src, dest)
            print(f"✅ Copied {name} -> static/cv.pdf")
            return True
    print("⚠️ No CV found in root. Place cv.pdf in project root and re-run.")
    return False

def move_certs():
    moved = []
    missing = []
    for cert in CERT_FILES:
        src = os.path.join(ROOT, cert)
        if os.path.exists(src):
            dst = os.path.join(CERTS_DIR, cert)
            shutil.move(src, dst)
            moved.append(cert)
        else:
            missing.append(cert)
    return moved, missing

def copy_logo():
    src_names = ['logo.png', 'logo.jpg']
    for nm in src_names:
        src = os.path.join(ROOT, nm)
        if os.path.exists(src):
            dst = os.path.join(IMAGES_DIR, nm)
            shutil.copy2(src, dst)
            print(f"✅ Copied {nm} -> static/images/")
            return True
    print("⚠️ No logo found in project root. Add logo.png to static/images/")
    return False

if __name__ == "__main__":
    print("→ Running manage_files...")
    ensure_cv()
    copy_logo()
    moved, missing = move_certs()
    print()
    if moved:
        print("Moved certificates:")
        for m in moved: print(" •", m)
    if missing:
        print("Missing certificates (place them in project root to move):")
        for mm in missing: print(" •", mm)
    print("\nDone. Then run: python app.py")
