
# Update ใน backend<br />
โฟลเดอใหม่คือ middlewares, service<br />
ไฟล์ใหม่ในคือ authentication.go(ในcontroller)<br />
ไฟล์ที่ต้องอัพเดทคือ history_student.db(ในbackend), main.go(ในbackend), admin.go(ในcontroller), setup.go(entity)<br /><br />
***main.go อัพเดทใหม่การเรียกฟังก์ชันของบางคนน่าจะหายไป อย่าลืมไปใส่คืนด้วยนะ อย่างในรูปด้านล่าง <br />
![image](https://user-images.githubusercontent.com/111451719/197281316-4a586b6d-050e-4405-95a6-9fda02430d16.png)

# Update ใน frontend<br />
โฟลเดอใหม่คือ services<br />
ไฟล์ใหม่ในคือ SignIn.tsx(ในcomponents), ISignin.ts(ในmodels)<br />
ไฟล์ที่ต้องอัพเดทคือ App.tsx(ในsrc), BehaviorPointCreate.tsx(ในcomponent), Behavior_Points.tsx(ในcomponent)<br /><br />
***ระบบเราจะเป็นแบบต้องloginก่อนถึงจะใช้งานได้แล้ว ไปลองแกะๆจาก <a href="https://github.com/tunt7/StudentHistorySystem/blob/main/frontend/src/components/BehaviorPointCreate.tsx">BehaviorPointCreate.tsx</a> กับ <a href="https://github.com/tunt7/StudentHistorySystem/blob/main/frontend/src/components/Behavior_Points.tsx">Behavior_Points.tsx</a> ดูนะ<br />

# username, email ของแต่ละคน (passwordของทุกคนคือ 123)
![image](https://user-images.githubusercontent.com/111451719/197275978-a9d27643-19e6-4260-a06c-6c533be672f2.png)<br /><br />
