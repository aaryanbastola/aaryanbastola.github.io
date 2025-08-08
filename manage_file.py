#!/usr/bin/env python3
"""
manage_files.py
Simple utility to ensure cv.pdf exists and certificates are placed in ./certs/
Run from your site folder: python3 manage_files.py
"""

import os
import shutil
import sys

# Filenames you specified (exact)
CERT_FILES = [
    "_certificate_aaryanbastola221-gmail-com_7354cbbe-1d15-419a-9dcc-c28a25c1d13d.pdf",
    "_certificate_aaryanbastola221-gmail-com_528379cc-5ed9-488b-9eb1-6d9440bdf1be.pdf",
    "_certificate_aaryanbastola221-gmail-com_d298558a-62ef-4702-8172-eeaf3aff6ea8.pdf",
    "_certificate_aaryanbastola221-gmail-com_fca4a681-d938-445a-bb12-eaab749d42eb.pdf"
]

# Common alternate CV/resume filenames we will try to rename to cv.pdf if cv.pdf is missing
POSSIBLE_CV_NAMES = [
    "Aaryan_Bastola_Resume.pdf",
    "Aaryan_Bastola_CV.pdf",
    "resume.pdf",
    "CV.pdf",
    "aaryan_cv.pdf",
    "aaryan_resume.pdf"
]

def ensure_cv_exists():
    if os.path.exists("cv.pdf"):
        print("✅ cv.pdf already exists.")
        return True

    for name in POSSIBLE_CV_NAMES:
        if os.path.exists(name):
            try:
                shutil.copy2(name, "cv.pdf")
                print(f"✅ Found '{name}' — copied to 'cv.pdf'.")
                return True
            except Exception as e:
                print(f"❌ Error copying {name} to cv.pdf: {e}")
                return False

    print("⚠️ cv.pdf not found and no common alternatives were present.")
    return False

def move_certificates():
    certs_dir = "certs"
    os.makedirs(certs_dir, exist_ok=True)
    moved = []
    missing = []

    for cert in CERT_FILES:
        if os.path.exists(cert):
            try:
                dst = os.path.join(certs_dir, cert)
                shutil.move(cert, dst)
                moved.append(cert)
            except Exception as e:
                print(f"❌ Failed to move {cert}: {e}")
        else:
            missing.append(cert)

    return moved, missing, certs_dir

def main():
    print("→ Running file manager...")
    cv_ok = ensure_cv_exists()

    moved, missing, certs_dir = move_certificates()

    print("\n--- Summary ---")
    print(f"cv.pdf present: {'Yes' if cv_ok else 'No'}")
    if moved:
        print(f"Moved {len(moved)} certificate(s) into ./{certs_dir}/:")
        for m in moved:
            print(f"  • {m}")
    if missing:
        print(f"\nMissing {len(missing)} certificate(s):")
        for mm in missing:
            print(f"  • {mm}")
        print("\nPut missing certificate files in the project folder and re-run this script, or upload them to your server and update the hrefs in index.html accordingly.")

    print("\nAll done. If you want me to:")
    print(" - generate GitHub raw links for these files,")
    print(" - create a zip bundle ready for GitHub Pages,")
    print(" - or auto-convert a DOCX CV into a clean PDF template (needs more info),")
    print("say which and I’ll do it.")

if __name__ == "__main__":
    main()
