#!/usr/bin/env python3
"""
manage_files.py
Utility to ensure cv.pdf exists and certificates are placed in ./certs/
"""

import os, shutil

CERT_FILES = [
    "_certificate_aaryanbastola221-gmail-com_7354cbbe-1d15-419a-9dcc-c28a25c1d13d.pdf",
    "_certificate_aaryanbastola221-gmail-com_528379cc-5ed9-488b-9eb1-6d9440bdf1be.pdf",
    "_certificate_aaryanbastola221-gmail-com_d298558a-62ef-4702-8172-eeaf3aff6ea8.pdf",
    "_certificate_aaryanbastola221-gmail-com_fca4a681-d938-445a-bb12-eaab749d42eb.pdf"
]

POSSIBLE_CV_NAMES = [
    "Aaryan_Bastola_Resume.pdf", "Aaryan_Bastola_CV.pdf",
    "resume.pdf", "CV.pdf", "aaryan_cv.pdf", "aaryan_resume.pdf"
]

def ensure_cv_exists():
    if os.path.exists("cv.pdf"):
        print("✅ cv.pdf already exists.")
        return True
    for name in POSSIBLE_CV_NAMES:
        if os.path.exists(name):
            shutil.copy2(name, "cv.pdf")
            print(f"✅ Copied {name} to cv.pdf")
            return True
    print("⚠️ No cv.pdf found.")
    return False

def move_certificates():
    certs_dir = "certs"
    os.makedirs(certs_dir, exist_ok=True)
    moved, missing = [], []
    for cert in CERT_FILES:
        if os.path.exists(cert):
            shutil.move(cert, os.path.join(certs_dir, cert))
            moved.append(cert)
        else:
            missing.append(cert)
    return moved, missing

if __name__ == "__main__":
    print("→ Running file manager...")
    ensure_cv_exists()
    moved, missing = move_certificates()
    print("\n--- Summary ---")
    if moved: print("Moved:", *moved, sep="\n - ")
    if missing: print("Missing:", *missing, sep="\n - ")
