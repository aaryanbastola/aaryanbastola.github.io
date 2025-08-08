#!/usr/bin/env python3
import os, shutil

ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC = os.path.join(ROOT, 'static')
CERTS = os.path.join(STATIC, 'certs')
IMAGES = os.path.join(STATIC, 'images')
os.makedirs(CERTS, exist_ok=True)
os.makedirs(IMAGES, exist_ok=True)

CERT_FILES = [
    "_certificate_aaryanbastola221-gmail-com_7354cbbe-1d15-419a-9dcc-c28a25c1d13d.pdf",
    "_certificate_aaryanbastola221-gmail-com_528379cc-5ed9-488b-9eb1-6d9440bdf1be.pdf",
    "_certificate_aaryanbastola221-gmail-com_d298558a-62ef-4702-8172-eeaf3aff6ea8.pdf",
    "_certificate_aaryanbastola221-gmail-com_fca4a681-d938-445a-bb12-eaab749d42eb.pdf"
]

POSSIBLE_CV = ["cv.pdf","CV.pdf","Aaryan_Bastola_CV.pdf","Aaryan_Bastola_Resume.pdf","resume.pdf"]
def ensure_cv():
    for name in POSSIBLE_CV:
        src = os.path.join(ROOT, name)
        if os.path.exists(src):
            dst = os.path.join(STATIC, 'cv.pdf')
            shutil.copy2(src, dst)
            print(f"Copied {name} -> static/cv.pdf")
            return True
    print("No CV found in root. Place cv.pdf in project root and re-run.")
    return False

def move_certs():
    moved=[]
    missing=[]
    for cert in CERT_FILES:
        src = os.path.join(ROOT, cert)
        if os.path.exists(src):
            dst = os.path.join(CERTS, cert)
            shutil.move(src, dst)
            moved.append(cert)
        else:
            missing.append(cert)
    return moved, missing

def copy_logo():
    for nm in ('logo.png','logo.jpg'):
        src = os.path.join(ROOT, nm)
        if os.path.exists(src):
            dst = os.path.join(IMAGES, nm)
            shutil.copy2(src, dst)
            print(f"Copied {nm} -> static/images/")
            return True
    print("No logo found in project root. Add logo.png and re-run.")
    return False

if __name__ == "__main__":
    ensure_cv()
    copy_logo()
    moved,missing = move_certs()
    if moved: print("Moved:", moved)
    if missing: print("Missing:", missing)
