import { createReadStream } from 'fs';
import { FileService } from 'medusa-interfaces';
import { StorageClient } from '@supabase/storage-js';

interface Options {
  project_ref: string;
  service_key: string;
  bucket_name: string;
}

class SupabaseService extends FileService {
  project_ref: string;
  service_key: string;
  bucket_name: string;
  storage_url: string;

  constructor({}, options: Options) {
    super();
    this.project_ref = options.project_ref;
    this.service_key = options.service_key;
    this.bucket_name = options.bucket_name;
    this.storage_url = `https://${this.project_ref}.supabase.co/storage/v1/object/public`;
  }

  storageClient() {
    return new StorageClient(
      `https://${this.project_ref}.supabase.co/storage/v1`,
      {
        apiKey: this.service_key,
        Authorization: `Bearer ${this.service_key}`,
      }
    );
  }

  // @ts-ignore
  async upload(file: { path: string; originalname: string }) {
    const { data, error } = await this.storageClient()
      .from(this.bucket_name)
      .upload(file.path, createReadStream(file.path), { duplex: "half" });

    if (error) {
      console.log(error);
      throw error;
    }

    return {
      url: `${this.storage_url}/${this.bucket_name}/${data.path}`,
    };
  }

  // @ts-ignore
  async delete(filepath: string) {
    try {
      await this.storageClient().from(this.bucket_name).remove([filepath]);
    } catch (error) {
      throw error;
    }
  }
}

export default SupabaseService;
