import { Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "typeorm";
import { DriveReposiotry } from "./repository/drive";
import * as http from 'http'
import * as fs from 'fs'
import * as jimp from 'jimp'
@Injectable()
export class AppService {
  constructor(private driveRepository: DriveReposiotry,
    
    connection: Connection) {}
  getHello(): string {
    return "Hello World!";
  }

  async getConcat(){
    // return this.driveRepository.createQueryBuilder('drive').addSelect(`CONCAT("webContentLink", ' ' , "name") AS CONCATED `).getMany()
    // const a = await this.driveRepository.findOneOrFail({name:'asdasdas'})
    // console.log(a)
    // return a
    return this.driveRepository.createQueryBuilder('drive')
    .addSelect(`(CONCAT(webContentLink, ' ' , name) concated)`)
    .getMany()

  }

  async downloadFileDrive(id:string){
    // const {webViewLink,name} = await this.driveRepository.findOneIfExist(id)
    const drive= await this.driveRepository.findOne(id)
    if(!drive) throw new NotFoundException(`Drive id: ${id} not found`)
    const {webViewLink, name} = drive
    const file = fs.createWriteStream(name)

   http.get(webViewLink, function(response) {
   response.pipe(file);
   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});
  }

  async compareImage(){
   const logo = await jimp.read('images/logo.jpeg')
   const logo2 = await jimp.read('images/logo-2.jpeg')

   const logoHash = logo.hash()
   const logo2Hash = logo2.hash()

   const distance = jimp.distance(logo,logo2)

   const diff = jimp.diff(logo,logo2)

    return {
      distance,
      result: distance > 0.2 ? 'Image dont match' : 'Image match',
    }

  }

  

}
