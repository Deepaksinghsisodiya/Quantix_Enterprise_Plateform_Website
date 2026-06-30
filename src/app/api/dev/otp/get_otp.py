import sys
import sqlite3
import hashlib

def main():
    if len(sys.argv) < 2:
        print("ERROR: Missing merchantId argument")
        sys.exit(1)
        
    merchant_id = sys.argv[1].upper()
    db = r"D:\ForteckSolution\ApiWebService\Quantix.PlatformApi-20260530-local-tester-win-x64\platform-dev.db"
    
    try:
        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute(
            "SELECT OtpHash FROM EmailVerificationToken WHERE MerchantId = ? AND IsDeleted = 0 ORDER BY CreatedAt DESC LIMIT 1;", 
            (merchant_id,)
        )
        row = c.fetchone()
        conn.close()
        
        if not row:
            print("ERROR: No active OTP record found for this merchant")
            sys.exit(1)
            
        target = row[0].lower()
        for i in range(1000000):
            otp = f"{i:06d}"
            if hashlib.sha256(otp.encode('utf-8')).hexdigest() == target:
                print(otp)
                return
                
        print("ERROR: Could not brute force OTP")
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
