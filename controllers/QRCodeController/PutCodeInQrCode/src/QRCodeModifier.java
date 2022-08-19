import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import javax.imageio.ImageIO;

public class QRCodeModifier{
    public void putCode(String pathFile, String code) throws Exception{
        InputStream qrCodeFile = new FileInputStream(new File(pathFile));
        BufferedImage originalQrCode = ImageIO.read(qrCodeFile);         
        int widthImage = originalQrCode.getWidth();
        int heightImage = originalQrCode.getHeight();
        int newHeight = heightImage + 25;

        BufferedImage newMemoryImage = new BufferedImage(widthImage,newHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D memoryImageGraphic = (Graphics2D) newMemoryImage.getGraphics();
        memoryImageGraphic.setColor(new Color(255,255,255));
        memoryImageGraphic.fillRect(0, 0,widthImage, newHeight);
        memoryImageGraphic.drawImage(originalQrCode,0,0,null);
        memoryImageGraphic.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 20));
        memoryImageGraphic.setColor(Color.BLACK);
        memoryImageGraphic.drawString(code,(widthImage-(code.length()*5))/2,newHeight-10);
        ImageIO.write(newMemoryImage,"png", new File(pathFile));
    }   
}
