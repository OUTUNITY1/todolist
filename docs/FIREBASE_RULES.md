# Firebase Realtime Database Rules

## Rules cho Todo App

```json
{
  "rules": {
    "todos": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

## Rules mở rộng (nếu có thêm node `procedures`)

```json
{
  "rules": {
    "todos": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "procedures": {
      ".read": "auth != null",
      "$id": {
        ".write": "auth != null && (
          (!data.exists() && newData.child('uid').val() === auth.uid) ||
          (data.exists() && data.child('uid').val() === auth.uid && newData.child('uid').val() === auth.uid)
        )",
        ".validate": "newData.hasChildren(['name', 'uid', 'updatedAt', 'createdBy']) &&
                      newData.child('uid').isString() &&
                      newData.child('name').isString() &&
                      newData.child('name').val().length > 0"
      }
    }
  }
}
```

## Cách áp dụng

1. Vào [Firebase Console](https://console.firebase.google.com) → project của bạn
2. **Realtime Database** → tab **Rules**
3. Dán JSON → **Publish**

## Cấu trúc dữ liệu Todo

```
todos/
  {userId}/
    {taskId}/
      title: string
      completed: boolean
      createdAt: number (timestamp)
```
