package com.test;

import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import de.siegmar.fastcsv.reader.CsvReader;
import de.siegmar.fastcsv.reader.CsvRecord;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicInteger;

public class MultilineCsvBenchmarkFile {

    public static void main(String[] args) throws FileNotFoundException {

        Path file = Paths.get("file path");
        // Warm-up round
        runBenchmark(file, 1);

        // Actual benchmark
        BenchmarkResult result = runBenchmark(file, 10);

        System.out.printf("FastCSV avg time: %.2f ms\n", result.fastCsvTime);
        System.out.printf("Univocity avg time: %.2f ms\n", result.univocityTime);
        System.out.printf("Memory used - FastCSV: %d MB, Univocity: %d MB\n",
                result.fastCsvMemory / (1024 * 1024),
                result.univocityMemory / (1024 * 1024));
    }

    private static BenchmarkResult runBenchmark(Path file, int iterations) throws FileNotFoundException {
        double totalFastCsvTime = 0;
        double totalUnivocityTime = 0;
        long fastCsvMemory = 0;
        long univocityMemory = 0;

        final String[] description = new String[1];
        for (int i = 0; i < iterations; i++) {
            // Test FastCSV
            System.gc();
            long memoryBefore = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            long startTime = System.nanoTime();
            AtomicInteger rows = new AtomicInteger();
            try (CsvReader<CsvRecord> csv = CsvReader.builder().fieldSeparator(';')
                    .quoteCharacter('"').ofCsvRecord(file)) {
                csv.forEach(x -> {
                    description[0] = x.getField(2);
                    rows.incrementAndGet();
                });
            } catch (IOException e) {
                e.printStackTrace();
            }

            long fastCsvElapsed = System.nanoTime() - startTime;
            long memoryAfter = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            fastCsvMemory += (memoryAfter - memoryBefore);
            totalFastCsvTime += fastCsvElapsed / 1_000_000.0;

            // Test Univocity
            System.gc();
            memoryBefore = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            startTime = System.nanoTime();

            CsvParserSettings settings = new CsvParserSettings();
            settings.setLineSeparatorDetectionEnabled(true);
            settings.getFormat().setDelimiter(';');
            settings.getFormat().setQuote('"');
            settings.setHeaderExtractionEnabled(true);
            settings.setMaxCharsPerColumn(-1);
            settings.getFormat().setQuoteEscape('\\');
            CsvParser parser = new CsvParser(settings);

            int csvrows = 0;
            Iterable<Record> records = parser.iterateRecords(new FileReader(file.toFile()));
            for (Record record : records) {
                // Process each row
                description[0] = record.getString(2);
                ++csvrows;
            }

//            parser.parseAll(new FileReader(file.toFile())).forEach(record -> {
//                // Process each row
//                description[0] = record[2];
//                rows.incrementAndGet();
//            });

            long univocityElapsed = System.nanoTime() - startTime;
            memoryAfter = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            univocityMemory += (memoryAfter - memoryBefore);
            totalUnivocityTime += univocityElapsed / 1_000_000.0;
        }

        return new BenchmarkResult(
                totalFastCsvTime / iterations,
                totalUnivocityTime / iterations,
                fastCsvMemory / iterations,
                univocityMemory / iterations
        );
    }

    static class BenchmarkResult {
        final double fastCsvTime;
        final double univocityTime;
        final long fastCsvMemory;
        final long univocityMemory;

        BenchmarkResult(double fastCsvTime, double univocityTime,
                        long fastCsvMemory, long univocityMemory) {
            this.fastCsvTime = fastCsvTime;
            this.univocityTime = univocityTime;
            this.fastCsvMemory = fastCsvMemory;
            this.univocityMemory = univocityMemory;
        }
    }
}