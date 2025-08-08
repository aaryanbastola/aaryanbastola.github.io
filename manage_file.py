#!/usr/bin/env python3
"""
manage_files.py
Place this in your project root. It ensures:
 - static/cv.pdf exists (copies common alternatives)
 - static/images/logo.png exists (copies common alternatives)
 - moves your certificate PDFs into static/certs/
Run: python3 manage_files.py
"""
import os
import shutil

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
POSSIBLE_LOGO = ["logo.png","logo.jpg","logo.jpeg"]

def ensure_cv():
    dst = os.path.join(STATIC, 'cv.pdf')
    if os.path.exists(dst):
        print("✅ static/cv.pdf already exists.")
        return True
    for nm in POSSIBLE_CV:
        src = os.path.join(ROOT, nm)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"✅ Copied {nm} -> static/cv.pdf")
            return True
    print("⚠️ No CV found in root. Place cv.pdf in project root if you want it copied to static/")
    return False

def copy_logo():
    for nm in POSSIBLE_LOGO:
        src = os.path.join(ROOT, nm)
        if os.path.exists(src):
            dst = os.path.join(IMAGES, nm)
            shutil.copy2(src, dst)
            # ensure path static/images/logo.png (normalize to png)
            final = os.path.join(IMAGES, 'logo.png')
            if not os.path.exists(final):
                try:
                    shutil.copy2(src, final)
                except Exception:
                    pass
            print(f"✅ Copied {nm} -> static/images/")
            return True
    print("⚠️ No logo found in project root. Add logo.png (or .jpg/.jpeg) and re-run.")
    return False

def move_certs():
    moved = []
    missing = []
    for cert in CERT_FILES:
        src = os.path.join(ROOT, cert)
        if os.path.exists(src):
            dst = os.path.join(CERTS, cert)
            try:
                shutil.move(src, dst)
                moved.append(cert)
            except Exception as e:
                print(f"❌ Failed moving {cert}: {e}")
        else:
            missing.append(cert)
    return moved, missing

if __name__ == "__main__":
    print("→ Running manage_files...")
    cv_ok = ensure_cv()
    logo_ok = copy_logo()
    moved, missing = move_certs()

    print("\n--- Summary ---")
    print("cv.pdf present in static:", cv_ok)
    print("logo present in static/images:", logo_ok)
    if moved:
        print(f"Moved {len(moved)} certificate(s) into static/certs/:")
        for m in moved: print(" •", m)
    if missing:
        print(f"\nMissing {len(missing)} certificate(s):")
        for mm in missing: print(" •", mm)
        print("\nPlace missing certificate files in project root and re-run this script.")

    print("\nDone.")
