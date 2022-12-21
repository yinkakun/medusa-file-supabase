# medusa-file-supabase

Supabase Storage plugin for MedusaJS.

## Installation

```bash
yarn add medusa-file-supabase
```

## Usage

Create a Supabase Project and add a Public Storage Bucket.

Open the Storage Bucket and click on the "Settings" tab. Copy the "Project Ref" and "Service Key" and add them to your `medusa-config.js` file.

```js
module.exports = {
  // ... other config
  plugins: [
    // ... other plugins
    {
      resolve: `medusa-file-supabase`,
      options: {
        project_ref: 'PROJECT_REF',
        service_key: 'SERVICE_KEY',
        bucket_name: 'BUCKET_NAME',
      },
    },
  ],
};
```
