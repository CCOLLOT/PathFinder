import bcrypt

passwd = '123456'.encode('utf-8')


hashed = bcrypt.hashpw(passwd, bcrypt.gensalt())


test ='123456'.encode("utf-8")
if bcrypt.checkpw(test,hashed):
    print("matching")
else:
    print("not matching")