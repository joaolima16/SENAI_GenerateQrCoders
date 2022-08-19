
public class App {
    public static void main(String[] args) throws Exception {
        String pathFile = args[0];
        String codeQRCode = args[1];
        QRCodeModifier QRM = new QRCodeModifier();
        QRM.putCode(pathFile,codeQRCode);
        System.out.println("QRCode modificated sucessful");
    }
}