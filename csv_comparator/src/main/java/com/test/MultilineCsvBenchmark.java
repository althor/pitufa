package com.test;

import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import de.siegmar.fastcsv.reader.CsvReader;
import de.siegmar.fastcsv.reader.CsvRecord;

import java.io.IOException;
import java.io.StringReader;

public class MultilineCsvBenchmark {
    // Generate test data with different sizes and complexity
    private static String generateTestData(int rows) {
        StringBuilder sb = new StringBuilder();
        sb.append("id,name,description\n");

        for (int i = 0; i < rows; i++) {
            sb.append(i).append(",");
            sb.append("Name").append(i).append(",");
            sb.append("\"This is a\nmulti-line description\nfor row ").append(i).append("\"\n");
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        // Test with different data sizes
        int[] testSizes = {100, 1000, 10000, 100000, 1000000};

        for (int size : testSizes) {
            String testData = generateTestData(size);
            System.out.println("\nTesting with " + size + " rows:");

            // Warm-up round
            runBenchmark(testData, 1);

            // Actual benchmark
            BenchmarkResult result = runBenchmark(testData, 5);

            System.out.printf("FastCSV avg time: %.2f ms\n", result.fastCsvTime);
            System.out.printf("Univocity avg time: %.2f ms\n", result.univocityTime);
            System.out.printf("Memory used - FastCSV: %d MB, Univocity: %d MB\n",
                    result.fastCsvMemory / (1024 * 1024),
                    result.univocityMemory / (1024 * 1024));
        }
    }

    private static BenchmarkResult runBenchmark(String testData, int iterations) {
        double totalFastCsvTime = 0;
        double totalUnivocityTime = 0;
        long fastCsvMemory = 0;
        long univocityMemory = 0;

        for (int i = 0; i < iterations; i++) {
            // Test FastCSV
            System.gc();
            long memoryBefore = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            long startTime = System.nanoTime();
            try (CsvReader<CsvRecord> csv = CsvReader.builder().ofCsvRecord(testData)) {
                csv.forEach(x -> {
                    String description = x.getField(2);
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
            CsvParser parser = new CsvParser(settings);

            parser.parseAll(new StringReader(testData)).forEach(record -> {
                // Process each row
                String description = record[2];
            });

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